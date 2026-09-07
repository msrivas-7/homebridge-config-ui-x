# Isolated browser verification

The test console uses a local `admin` account with the dummy password `admin`, synthetic credentials, and two virtual HAP outlets. It does not use production Homebridge storage, vendor accounts, cloud APIs or physical devices.

## Setup

Use Node 24 and install the dependencies in this checkout and the sibling `homebridge-moonside` checkout. Build with `npm run build`. Create `/tmp/homebridge-browser-e2e` with empty `plugins`, `persist` and `accessories` directories and an empty `homebridge.log`. Copy `test/mocks/auth.json` into that directory as `auth.json`.

Save the following as its `config.json`:

```json
{
  "bridge": {
    "name": "Browser Test Bridge",
    "username": "0E:12:34:56:78:9A",
    "pin": "031-45-154",
    "port": 18782
  },
  "accessories": [],
  "platforms": [
    {
      "platform": "config",
      "name": "Config",
      "host": "127.0.0.1",
      "port": 18781,
      "auth": "form",
      "enableMdnsAdvertise": false
    },
    {
      "platform": "Example",
      "name": "Synthetic Plugin",
      "password": "example-password-not-real",
      "apiKey": "example-api-key-not-real"
    }
  ]
}
```

Start the fixture with `node .contributions/browser/fixture-bridge.mjs`. In another terminal, start the UI:

```sh
UIX_STORAGE_PATH=/tmp/homebridge-browser-e2e \
UIX_CONFIG_PATH=/tmp/homebridge-browser-e2e/config.json \
UIX_CUSTOM_PLUGIN_PATH=/tmp/homebridge-browser-e2e/plugins \
UIX_SERVICE_MODE=0 UIX_INSECURE_MODE=1 \
node --import ./.contributions/browser/fixture-discovery.mjs dist/main.js
```

Open `http://127.0.0.1:18781` in the local browser. The discovery preload seeds only the loopback fixture; HAP reads, writes, monitoring, UI authentication and layout persistence are real. The fixture suppresses LAN advertisements and forces the HAP listener to loopback. Check both listeners with `lsof` before testing. Do not pair this test bridge with Apple Home.

## Outlet journey

1. Open Accessories. Both virtual plugs initially show `Outlet 1`.
2. Identify each plug by serial in its settings. Rename A to `Desk Power` and B to `Lamp Power`.
3. Navigate away and back, then reload. Check both names remain distinct.
4. Toggle each card. Check `plug-state.json` records the command for the corresponding plug.
5. Send SIGUSR1 to the fixture PID to remove B. Reload, edit A and save. Check `accessories/uiAccessoriesLayout.json` still contains both serials and custom names.
6. Send SIGUSR2 to restore B. Reload and verify both names and independent controls. SIGTERM stops the fixture.

## Privacy journey

1. Open JSON Config. Verify common secret fields are masked, the preview is read only and Save is absent.
2. Reveal and edit, then switch to Plain Text Editor. Change the synthetic plugin name, hide and reveal. Verify the edit remains.
3. Save and inspect the fixture config on disk. Credentials must remain unchanged and no redaction markers may be written. Reload and verify masking returns.
4. Copy a backup into the editor, edit it, and switch to Default Editor. Hide and reveal the Monaco comparison. Verify the edit survives, then save and check disk.
5. Hide an incomplete JSON edit. Verify no raw text is exposed. Reveal to recover it, then discard.
6. With an unsaved edit hidden, navigate away. Verify Cancel preserves it and Discard leaves the page.
7. Check both icon states, keyboard activation and a narrow viewport. Capture only pages with synthetic data.

## Observed results

Outlet rename, persistence, commands, offline retention and reconnect passed in the local browser. Real HAP payloads confirmed matching name identifiers but different serials. Saved configuration and backup edits retained the dummy credentials without redaction markers. Hidden unsaved edits produced the discard prompt.

The first fixture reconnect attempt failed because HAP controller storage cannot reattach the same object. The fixture now creates a fresh accessory with the same UUID; the repeated cycle passed. Initial browser requests also found missing fixture storage directories. Creating the normal empty directories resolved those setup errors. These were test setup problems, not production changes.

Screenshots and fixtures are review evidence on the combined fork branch. They are excluded from all proposed PR diffs. Hardware, vendor cloud services and hosted CI are outside this run.

## Plugin form journey

Copy the `plugin` directory beside this file to `/tmp/homebridge-browser-e2e/plugins/homebridge-browser-test` before starting the UI. It contains no device implementation or cloud calls. The existing synthetic `Example` config belongs to this plugin.

Open its Plugin Config menu. Verify password and API key use native password inputs. Reveal one field and confirm the other remains hidden. Enter a short password and confirm Save is disabled. Enter a valid dummy password, hide it and save. Inspect the isolated config file for the actual value, not a mask. Reopen the form, verify masking resets, then reveal to confirm the saved value. Repeat at 390 x 844 and with keyboard activation.

These checks passed. Browser screenshots show only synthetic values. The generated forms use the existing schema library; arbitrary HTML inside a custom plugin UI is not covered unless it uses Homebridge's shared schema form.

The pattern follows the [GOV.UK password input guidance](https://design-system.service.gov.uk/components/password-input/) for default masking, explicit reveal and disabled spell checking, while using Homebridge's existing eye icons and button styles.

The schema library also logs that `format: password` is not a recognized validation format when a nonempty declared password is validated. Its existing validator accepts that format after logging. Upstream uses the same library version and validator; this change does not modify it. Required and minimum length validation still passed in the browser.

The final outlet browser run used the independent `dev/outlet-layout-identity` build at `9d2b3a51`. A was renamed to `Desk Outlet` during the offline save; B retained `Lamp Power`. Both returned with the correct names and On state. Fresh branch checks passed 85 tests, build and lint.
