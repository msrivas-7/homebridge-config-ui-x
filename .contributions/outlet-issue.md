# Custom names collide between separate outlets with the same service name

## Describe The Bug

Two plugs can expose the same service name and nameBasedUniqueId. The UI can then apply one plug's custom name to the other. Saving while one plug is offline can also drop its saved layout entry.

1. Discover two outlets on one bridge with different serials and the same nameBasedUniqueId.
2. Give each outlet a different custom name, then discover them again.
3. Take one outlet offline and save the layout.

Each outlet should keep its own name and layout entry. The synthetic regression tests reproduce both failures on the current source.

## Environment

Homebridge UI 5.29.0, source bb94ef61. Node 24.20.0 on macOS 27.0, Apple Silicon. The reproduction runs through the UI socket fixtures without a bridge process. The original device report used Homebridge 2.4.0.

No account configuration or device logs are needed. Issue #2307 concerns propagating accessory names to HomeKit, which is a different path.
