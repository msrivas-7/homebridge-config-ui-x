# Show a masked preview before opening the JSON config editor

## Feature Description

Opening JSON Config immediately displays plugin passwords and tokens. This makes an ordinary support screenshot easy to get wrong.

Show a preview with common secret fields masked, with a Reveal and edit button for the existing editor. Hiding it again should retain unsaved edits. The preview must never be saved as the real configuration.

This is a display feature. It does not encrypt config.json or protect API responses, backups or logs. Unusual secret fields still need manual review before sharing.

Issue #2690 proposed a broader secret store and log redaction. This proposal is limited to the editor. A working implementation and tests are available on the fork; feedback on the default behavior would be useful before a PR.
