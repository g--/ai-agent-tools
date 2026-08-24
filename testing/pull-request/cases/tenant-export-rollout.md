# Case: self-contained rollout description

## Intended artifact

A pull request description for application engineers, SREs, and the release manager. Readers may not have read the ticket or design document.

## Task

Write the pull request description.

## Source material

Enterprise customers can request a daily CSV export of active users. Today, the export worker queries the primary application database synchronously at 02:00 UTC. It succeeds for small tenants but times out for tenants with more than 500,000 active users. Retrying the job can then overlap with the next scheduled run and produce two files for the same date.

This pull request changes the worker to create an export job record, process the export in 50,000-user batches, and store a per-tenant, per-date idempotency key before publishing a file. It adds a `tenant_export_jobs` table and a dashboard for job age and retry count. It does not change the CSV schema or backfill missed exports.

The job remains scheduled at 02:00 UTC. A run may now take up to 90 minutes for the largest tenant. The release must be deployed before 01:30 UTC so the migration finishes before the first scheduled job. The new dashboard must be checked during the first two runs. Support needs a runbook for responding to a job that remains queued for more than two hours.

The related ticket is EXPORT-771. The change is part of a larger export-reliability initiative that will later add customer-selected schedules and delivery to cloud storage, neither of which is included here.

## Completion criteria

A reader can understand the customer-impacting failure, what this pull request changes and deliberately does not change, why the rollout timing matters, what must be monitored or prepared after deployment, and how EXPORT-771 relates to the work without opening the ticket. The description should not become a line-by-line summary of the diff.
