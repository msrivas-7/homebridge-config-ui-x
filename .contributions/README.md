# Contribution review

Nothing has been submitted upstream. These are complete text drafts, not published issues or PRs.

## Separate changes

1. [Outlet issue](outlet-issue.md) and [PR](outlet-pr.md). Branch [dev/outlet-layout-identity](https://github.com/msrivas-7/homebridge-config-ui-x/tree/dev/outlet-layout-identity), commit 9d2b3a51.
2. [Privacy issue](privacy-issue.md) and [PR](privacy-pr.md). Branch [dev/config-privacy-preview](https://github.com/msrivas-7/homebridge-config-ui-x/tree/dev/config-privacy-preview), commit 431db29f.

Each branch starts from upstream bb94ef61 and contains one concern. The draft files stay on this combined branch and are excluded from both proposed PR diffs. Both branches merge together without conflicts.

## Submission order

The contribution guide welcomes PRs and does not require an issue first. The bug template asks authors to search for duplicates. Searches found no exact match; #2307 is about HomeKit name propagation, and #2690 covers a broader secret store. Recheck before posting.

After approval, submit the two issue drafts. Discuss the privacy default with maintainers before opening that feature PR. Link each PR to its own issue once a real issue number exists. Do not claim either PR implements encryption or fixes #2307 or #2690.

## Verification

Outlet: all 85 service tests pass. The three new tests fail against unmodified upstream. Build and lint pass.

Privacy: all 4,098 tests in 100 UI files pass on the separate branch. Build and lint pass. Browser checks used synthetic credentials and a separate console on 127.0.0.1:18781. Saved credentials remained intact; redaction markers were not written. Edited backup comparisons survive hiding and reopening. Hidden unsaved edits still trigger the discard prompt.

One earlier full suite run passed every assertion but exited with an uncaught timer error in unchanged login.component.ts after test teardown. A fresh full run passed. The build also reports an existing unused NgbTooltip import in BridgesWidgetComponent. Neither belongs in these PRs.

Checks ran on macOS 27.0, Apple Silicon, Node 24.20.0. Linux, Windows and hosted CI have not been claimed as tested. The live Homebridge installation was not changed. The temporary test server was stopped.

Source review, tests and browser checks found no remaining defect in these changes. That is evidence for review readiness, not a guarantee that no bug can exist.
