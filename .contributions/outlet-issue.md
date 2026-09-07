# Custom outlet names are applied to other plugs

## Describe The Bug

Two plugs can expose an outlet named `Outlet 1` with the same manufacturer and bridge but different serial numbers. Their `nameBasedUniqueId` values match, so the UI can restore one plug's custom name onto the other. Saving while one plug is offline can also drop its saved layout entry.

1. Add two such outlets to the same bridge.
2. In Accessories, give them different custom names and reload the page.
3. Take one plug offline, edit the other and save the layout.
4. Bring the offline plug back and reload.

Each outlet should keep its own custom name and saved layout entry. This affects the Homebridge UI layout. It does not concern propagating names to Apple Home, as in #2307.

Three regression tests reproduce the failures on current `latest` at `bb94ef61`. A local virtual HAP bridge reproduces the matching name identifiers without vendor accounts or physical devices.

## Environment

| Field | Version |
| --- | --- |
| Homebridge UI | 5.29.0 |
| Homebridge | 2.4.0 in the original installation; standalone virtual HAP bridge for verification |
| Node.js | 24.20.0 |
| Operating system | macOS 27.0, Apple Silicon |
| Test environment | Standalone local UI with isolated storage |

Happy to provide more details if useful.
