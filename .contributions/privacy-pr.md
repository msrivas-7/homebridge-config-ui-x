# Mask common secrets before opening the config editor

JSON Config currently shows credentials as soon as the page opens. Add a preview that masks common secret fields, with an eye control to reveal and edit. Desktop keeps text labels; narrow screens use icons with accessible names. Hiding the editor keeps unsaved edits, including changes to a restored backup.

Keep the original config separate from the preview and block saves while it is masked. Invalid JSON shows a message instead of raw text. This is display masking, not encryption or complete redaction.

Verified: 4,098 UI tests pass, plus build and lint. Browser checks cover reveal, editing, saving, reload, backup comparison and the unsaved changes prompt. A regression test catches lost backup edits when the comparison is recreated.

Browser verification used a separate local admin, dummy credentials and isolated storage. It covered keyboard controls, a narrow viewport, save integrity, reload, backup edits and hidden unsaved changes.

Masked preview:

![Masked config preview](https://raw.githubusercontent.com/msrivas-7/homebridge-config-ui-x/dev/privacy-and-accessory-identity/.contributions/screenshots/config-masked.png)

Explicit reveal, with dummy values:

![Revealed test config](https://raw.githubusercontent.com/msrivas-7/homebridge-config-ui-x/dev/privacy-and-accessory-identity/.contributions/screenshots/config-revealed-dummy-values.png)
