# Mask common secrets before opening the config editor

Fixes #3010

JSON Config shows credentials as soon as it opens. Start with a read only preview that masks common secret fields with `********`. An eye control opens the existing editor. Desktop keeps text labels; narrow screens use icons with accessible names.

Keep the original config separate from the preview and prevent saving while it is masked. Hiding and revealing retains unsaved edits, including edited backup comparisons. Invalid JSON shows a message instead of exposing raw text.

Verified with 93 focused tests on this branch, build and lint. All 4,104 UI tests pass with the three UI contributions combined. The local browser run covers keyboard controls, a narrow viewport, editing, save integrity, reload, backup comparison and unsaved changes. All data and accounts used for testing are synthetic.

This is display masking. Unusual secret fields can be missed, and config.json, API responses, backups and logs remain unchanged.

![Masked config preview](https://raw.githubusercontent.com/msrivas-7/homebridge-config-ui-x/71d51908/.contributions/screenshots/config-masked.png)

![Explicit reveal with dummy values](https://raw.githubusercontent.com/msrivas-7/homebridge-config-ui-x/71d51908/.contributions/screenshots/config-revealed-dummy-values.png)

Happy to adjust the interaction or default behavior based on feedback.
