# Case: revise an Atlas dual-write commit message

## Test purpose

Test whether the skill removes references to related merged work that does not explain the committed behavior, while preserving the project motivation and the commit's material contribution.

## Intended artifact

A Git commit message for engineers investigating the Project Atlas migration in history.

## Task

Revise the draft for its intended readers. Preserve supported facts and intended meaning. Do not introduce facts not present in the source material.

## Source material

Project Atlas moves reporting from host-local event files to a shared event store so reports can continue after requests are routed to another application host. This commit changes the reporting worker to write each new report-completion event to both the existing host-local file and the shared event store. Report reads remain on host-local files. The dual write supplies the shared-store data required for a later migration of report reads.

PRs #123 and #345 previously added the `SharedEvent` and `ReportEvent` types. Those PRs are merged, but no production service used the types before this commit. The commit also renames `publishEvent` to `writeEvent`. CI's dual-write integration test passed.

## Draft to revise

feat(atlas): ✨ use SharedEvent and ReportEvent

PRs #123 and #345 are merged, and this is the first production use of their
types. Rename publishEvent to writeEvent and write report-completion events.

Refs: #123, #345

## Evaluation criteria

The revision makes the dual-write behavior and its role in the Atlas migration understandable from the subject and body. It retains the fact that reads remain on host-local files when that context helps explain the staged migration. It does not foreground the prior type-definition PRs, the lack of earlier type usage, or the function rename, because those details do not explain the behavior or decision context of this commit. It uses the required Conventional Commit and Gitmoji format and makes no unsupported claims.
