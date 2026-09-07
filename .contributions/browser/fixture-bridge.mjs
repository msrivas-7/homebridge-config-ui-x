import { mkdirSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import process from 'node:process'

// Test dependencies come from the sibling Moonside checkout, never the live service.
const require = createRequire(new URL('../../../homebridge-moonside/package.json', import.meta.url))
const hap = require('hap-nodejs')
const { CiaoAdvertiser } = require('hap-nodejs/dist/lib/Advertiser.js')

const { HAPServer } = hap

const storage = '/tmp/homebridge-browser-e2e'
mkdirSync(join(storage, 'hap'), { recursive: true })
hap.HAPStorage.setCustomStoragePath(join(storage, 'hap'))

// Discovery is seeded in the UI test process. Never advertise fixtures on the LAN.
CiaoAdvertiser.prototype.startAdvertising = async () => {}
CiaoAdvertiser.prototype.updateAdvertisement = () => {}
const listen = HAPServer.prototype.listen
HAPServer.prototype.listen = function (port) {
  return listen.call(this, port, '127.0.0.1')
}

const bridge = new hap.Bridge('Browser Test Bridge', hap.uuid.generate('browser-test-bridge'))
bridge.disableUnusedIDPurge()
const state = { A: false, B: false, onlineB: true, commands: [] }
const save = () => writeFileSync(join(storage, 'plug-state.json'), JSON.stringify(state, null, 2))
function plug(id) {
  const accessory = new hap.Accessory('Twin Plug', hap.uuid.generate(`browser-test-plug-${id}`))
  accessory.getService(hap.Service.AccessoryInformation)
    .setCharacteristic(hap.Characteristic.Manufacturer, 'Test Fixtures')
    .setCharacteristic(hap.Characteristic.Model, 'Twin Outlet')
    .setCharacteristic(hap.Characteristic.SerialNumber, `BROWSER-PLUG-${id}`)
  const service = accessory.addService(hap.Service.Outlet, 'Outlet 1', 'outlet-1')
  service.setCharacteristic(hap.Characteristic.OutletInUse, true)
  service.getCharacteristic(hap.Characteristic.On).onGet(() => state[id]).onSet((value) => {
    state[id] = value
    state.commands.push({ plug: id, value })
    save()
  })
  return accessory
}
const plugs = [plug('A'), plug('B')]
bridge.addBridgedAccessories(plugs)
process.on('SIGUSR1', () => {
  if (state.onlineB) {
    bridge.removeBridgedAccessory(plugs[1])
    state.onlineB = false
    save()
  }
})
process.on('SIGUSR2', () => {
  if (!state.onlineB) {
    plugs[1] = plug('B')
    bridge.addBridgedAccessory(plugs[1])
    state.onlineB = true
    save()
  }
})
process.on('SIGTERM', async () => {
  await bridge.unpublish()
  process.exit(0)
})
save()
bridge.publish({ username: '0E:12:34:56:78:9A', pincode: '031-45-154', port: 18782, bind: '127.0.0.1' }, true).catch((error) => {
  process.stderr.write(`${error}\n`)
  process.exit(1)
})
