# Case: validate production feature-flag provider

## Intended artifact

A pull request description for engineers reviewing a production-only feature-flag change.

## Task

Write the pull request description.

## Source material

This change routes checkout eligibility through the production feature-flag provider for `new_routing`. CI runs unit and integration suites, but both use the in-memory provider and do not exercise the production provider, its audit log, or its workspace targeting behavior.

Before rollout, enable `new_routing` only for the staging workspace `checkout-canary`. Confirm that the production-provider audit log records the expected evaluation and that a checkout request follows the enabled route. Disable `new_routing` for `checkout-canary` to roll back.

The provider client is implemented in `FlagProviderAdapter`, the rollout discussion had 29 comments, and the feature flag's original name was `routing_v2`.

## Completion criteria

The description states what changes and why a reviewer should care. It does not claim CI/CD coverage is sufficient. It gives a repeatable staging validation and rollback procedure, including the workspace, expected observations, and the flag to disable.
