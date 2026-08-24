# Case: decision document

## Intended artifact

A short decision document for a team choosing how to run scheduled data exports. The audience includes application engineers and the operations lead.

## Task

Write a decision document that recommends an approach and makes clear what is being decided.

## Source material

The product must export daily customer activity files to three enterprise customers by 06:00 in each customer's local time. Exports can take up to 35 minutes. The existing application scheduler runs in one UTC region and has no retry visibility after a deploy.

Option A is a cron job in the application. It is quick to build but inherits the scheduler's deployment and observability limitations.

Option B is the managed workflow service already used for billing reconciliation. It supports regional schedules, retry history, alerts, and runbooks. It costs about $180 per month and requires one week of engineering work.

Recommend option B. Customer success needs an on-call escalation path before the first export. The decision should be revisited after six months or after ten customers use exports, whichever happens first.

## Completion criteria

A reader can tell what decision is requested, why it matters, the recommendation and trade-off, who needs to act next, and when the decision will be revisited.
