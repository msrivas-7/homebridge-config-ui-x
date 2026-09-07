# Contribution review

The outlet fix is published as [issue #3008](https://github.com/homebridge/homebridge-config-ui-x/issues/3008) and [PR #3009](https://github.com/homebridge/homebridge-config-ui-x/pull/3009). The remaining changes are drafts and have not been submitted upstream.

## Separate changes

1. [Outlet issue](outlet-issue.md) and [PR](outlet-pr.md). Branch [dev/outlet-layout-identity](https://github.com/msrivas-7/homebridge-config-ui-x/tree/dev/outlet-layout-identity), commit 9d2b3a51.
2. [Privacy issue](privacy-issue.md) and [PR](privacy-pr.md). Branch [dev/config-privacy-preview](https://github.com/msrivas-7/homebridge-config-ui-x/tree/dev/config-privacy-preview), commit f783f1d8.

3. [Plugin form issue](plugin-secrets-issue.md) and [PR](plugin-secrets-pr.md). Branch [dev/plugin-secret-inputs](https://github.com/msrivas-7/homebridge-config-ui-x/tree/dev/plugin-secret-inputs), commit 63316998.

Each branch starts from upstream bb94ef61 and contains one concern. The draft files stay on this combined branch and are excluded from all proposed PR diffs. The branches merge together without conflicts.

## Submission order

The contribution guide welcomes PRs and does not require an issue first. The bug template asks authors to search for duplicates. Searches found no exact match; #2307 is about HomeKit name propagation, and #2690 covers a broader secret store. Recheck before posting.

The user authorized submitting one issue and its linked PR at a time. The outlet pair is open; keep the other contributions queued. Discuss the privacy default with maintainers before opening that feature PR. Link each PR to its own issue once a real issue number exists. Do not claim either PR implements encryption or fixes #2307 or #2690.

## Verification

Outlet: all 85 service tests pass. The three new tests fail against unmodified upstream. Build and lint pass.

Privacy: all 4,098 tests in 100 UI files pass on the separate branch. Build and lint pass. Browser checks used synthetic credentials and a separate console on 127.0.0.1:18781. Saved credentials remained intact; redaction markers were not written. Edited backup comparisons survive hiding and reopening. Hidden unsaved edits still trigger the discard prompt.

One earlier full suite run passed every assertion but exited with an uncaught timer error in unchanged login.component.ts after test teardown. A fresh full run passed. The build also reports an existing unused NgbTooltip import in BridgesWidgetComponent. Neither belongs in these PRs.

Checks ran on macOS 27.0, Apple Silicon, Node 24.20.0. Linux, Windows and hosted CI have not been claimed as tested. The live Homebridge installation was not changed. The temporary test processes are stopped after verification.

Plugin forms: 34 tests pass on the separate branch, including the real schema renderer. The updated JSON privacy branch passes its 93 focused tests.

The combined branch passed all 4,104 UI tests after adding the plugin form controls and JSON password mask. [Browser setup and checks](browser/README.md) document the isolated test run. The PR drafts embed screenshots from this fork; all shown credentials and devices are synthetic.

Source review, tests and browser checks found no remaining defect in these changes. That is evidence for review readiness, not a guarantee that no bug can exist.

PR #3009 is mergeable and contains only accessories.service.ts and its tests. The label workflows passed. The Node Build run has no jobs and reports `action_required`; hosted build verification is still pending.
