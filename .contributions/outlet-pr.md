# Fix saved names colliding between separate outlets

Fixes #3008

Two plugs can expose outlets with the same name identifier. The UI then restores the wrong custom name or drops the offline outlet from the saved layout.

Scope name matching and layout merge keys to the bridge and serial number. Keep the unique ID fallback. Missing serials no longer count as evidence that two outlets belong to the same device.

Verified with 85 accessory service tests, including three regressions that fail on the original source, plus build and lint. A local browser run with two virtual HAP plugs covers naming, reload, independent controls, saving while one plug is offline and reconnection. All accounts and devices in the test are synthetic.

![Distinct names after reconnection](https://raw.githubusercontent.com/msrivas-7/homebridge-config-ui-x/71d51908/.contributions/screenshots/outlet-names-after-reconnect.png)

Happy to adjust the approach based on feedback.
