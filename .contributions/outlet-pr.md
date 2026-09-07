# Fix saved names colliding between separate outlets

Two outlets on different plugs can share a nameBasedUniqueId. The UI then restores the wrong custom name or drops an offline outlet from the saved layout.

Scope name matching and merge keys to the bridge and serial number. Keep the existing unique ID fallback and Matter matching. Missing serials no longer count as evidence that two devices are the same.

Verified: all 85 accessory service tests pass, including three new regressions that fail on the original source. The server and UI build, lint and merge checks pass. No backend or HomeKit pairing behavior changes.
