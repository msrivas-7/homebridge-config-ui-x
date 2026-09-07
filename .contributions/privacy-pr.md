# Mask common secrets before opening the config editor

JSON Config currently shows credentials as soon as the page opens. Add a preview that masks common secret fields, with Reveal and edit to open the existing editor. Hiding the editor keeps unsaved edits, including changes to a restored backup.

Keep the original config separate from the preview and block saves while it is masked. Invalid JSON shows a message instead of raw text. This is display masking, not encryption or complete redaction.

Verified: 4,098 UI tests pass, plus build and lint. Browser checks cover reveal, editing, saving, reload, backup comparison and the unsaved changes prompt. A regression test catches lost backup edits when the comparison is recreated.
