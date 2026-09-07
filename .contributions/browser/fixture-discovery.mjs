import process from 'node:process'

import { HapClient } from '@homebridge/hap-client'

if (process.env.UIX_STORAGE_PATH !== '/tmp/homebridge-browser-e2e') {
  throw new Error('This fixture must use its dedicated test storage')
}

// Only replace discovery. Reads, writes, monitoring, auth and layout storage stay real.
HapClient.prototype.startDiscovery = function () {
  if (!this.instances.length) {
    this.instances = [{
      name: 'Browser Test Bridge',
      username: '0E:12:34:56:78:9A',
      ipAddress: '127.0.0.1',
      port: 18782,
      connectionFailedCount: 0,
      services: [],
      configurationNumber: 1,
    }]
  }
}
