# Case: enable audit exports for Atlas migration

## Test purpose

Test whether the skill grounds a PR in the reader's known project motivation and explains how this change advances it, rather than describing an isolated code change.

## Intended artifact

A pull request description for engineers reviewing work in the Atlas migration project.

## Task

Write the pull request description.

## Source material

Project Atlas moves the reporting platform from host-local event files to a shared event store so reports can run after requests are routed to a different application host. The project plan has three stages: establish the shared-event schema, dual-write new events, then move report reads to the shared store. The plan is tracked in #7310.

This pull request completes the first stage. It adds the `shared_events` schema and a write path that stores each new report event in both the current host-local file and the shared store. Reads continue to use host-local files. The dual write is required before report reads can safely move to the shared store in a later PR. It does not backfill historical events, remove host-local writes, or change report output.

CI runs schema validation and the dual-write integration test. Those checks create an event, verify one record in each store, and confirm the existing report output is unchanged. CI/CD coverage is sufficient to validate this change.

The schema migration has 612 lines. The working branch is `atlas/events-phase-one`. A design meeting considered three naming schemes before choosing `shared_events`. The project logo uses a mountain outline.

## Evaluation criteria

The description explains the project goal and identifies this PR as the shared-schema and dual-write stage that enables later read migration. It states material scope and exclusions, keeps #7310 as traceability rather than the explanation, and accurately reports the supplied CI/CD coverage.
