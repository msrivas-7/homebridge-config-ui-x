# Prepared contributions

Branch: `dev/privacy-and-accessory-identity`. Based on upstream `latest` at `bb94ef6`.
No pull request has been opened. These changes have not been installed into a live Homebridge service.

## Configuration privacy preview

Opening JSON Config now shows a read-only preview that masks common password, token,
API key, private key and pairing PIN fields. **Reveal and edit** opens the existing
Monaco or plain-text editor. **Hide secrets** returns to the preview while preserving
unsaved edits. Invalid JSON produces an unavailable-preview message instead of
falling back to raw text. Saving is blocked while the preview is active; redaction
markers never enter the editable configuration.

This is display masking, not encryption. The authenticated client still receives
raw configuration; config.json, backups, API responses, custom plugin UIs and logs
are outside this change. Unusual secret field names and credentials embedded in
ordinary string values may remain visible. The UI explicitly advises reviewing
before sharing. This is not a replacement for a future schema-aware secret store.

Validation: all 4,100 frontend tests passed (100 files); production server/UI build
and repository lint passed. New tests cover nested redaction, invalid JSON,
default masking, save prevention, button interaction and unsaved Monaco edits.
The browser smoke test used synthetic configuration and a separate loopback-only
server on port 18781: reveal/hide, plain-text editing, saving, reload and Monaco
recreation all passed. Reading the saved synthetic fixture confirmed the original
credential value was saved and no redaction marker was written. A pre-existing
unused NgbTooltip import warning remains in BridgesWidgetComponent during builds.

## Device-scoped accessory names

Name-based service identifiers can collide between separate multi-outlet devices.
Matching and saved-layout merge keys now scope those identifiers to a nonempty
serial number and bridge. Exact unique IDs remain a fallback; missing serial
numbers no longer imply that two similarly named devices are the same device.
Matter keeps its bridge-and-ID matching. Existing legacy-layout tests still pass.

New synthetic regressions cover two plugs with the same service name, custom-name
persistence through discovery/save, retaining an offline plug in the layout, and
refusing a name-only match when both serials are missing. Devices reporting the
same bogus serial and name-based ID remain inherently ambiguous.

## Reproduce

Use a supported Node.js version, then:

```sh
npm ci
npm ci --prefix ui
npm run test:ui
npm run build
npm run lint
```

For manual testing, use separate UIX_STORAGE_PATH and UIX_CONFIG_PATH values and
configure the test UI with `host: "127.0.0.1"` and a separate port. Do not set
UIX_DEVELOPMENT=1: upstream ignores the configured host in that mode. Do not copy
real credentials into fixtures, run npm link, or replace a production installation.
