# Mask secret fields in generated plugin forms

Plugin forms can expose passwords and API keys as plain text. Mask declared password fields and commonly named secret text inputs by default, with an eye button to reveal one value at a time.

Wrap the existing schema input instead of replacing its form control. Edits, validation, readonly state and saved values keep their existing behavior. Disable spelling and capitalization assistance for secret inputs. Eye buttons have accessible names and identify the input they control.

Verified in the Codex browser with a dummy plugin: independent reveal, keyboard controls, invalid input, editing, save integrity, reopening and a 390 px viewport. All 4,104 combined UI tests pass, plus build and lint. Separate branch checks cover the actual schema renderer.

Detection is a naming heuristic for single-line text inputs, plus explicit password fields. Unusual names, multiline values and arbitrary custom plugin HTML are outside this change. It does not encrypt credentials.

![Masked plugin fields](https://raw.githubusercontent.com/msrivas-7/homebridge-config-ui-x/dev/privacy-and-accessory-identity/.contributions/screenshots/plugin-secrets-masked.png)

![One synthetic value revealed](https://raw.githubusercontent.com/msrivas-7/homebridge-config-ui-x/dev/privacy-and-accessory-identity/.contributions/screenshots/plugin-one-secret-revealed.png)
