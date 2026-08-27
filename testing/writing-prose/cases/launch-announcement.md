# Case: announce a workspace export feature

## Intended artifact

A concise customer-facing product announcement email for workspace administrators. The email should help administrators decide whether the feature matters and how to begin using it.

## Task

Write the announcement email, including a subject line and body.

## Source material

On 2026-11-04, the product will make scheduled CSV exports available to Business and Enterprise workspace administrators. An administrator can configure one export per saved report, choose daily or weekly delivery, and send the resulting file to an approved S3 bucket. Exports run between 01:00 and 05:00 in the workspace's configured time zone. The file contains the report columns and filters saved at the time the export runs. The first delivery occurs at the next scheduled window, not immediately after configuration.

The feature addresses repeated requests from administrators who currently download reports manually for finance reconciliation and capacity planning. It does not create new report types, add Excel output, support ad hoc “export now,” send files by email, or allow destinations other than S3. It is not available to Free or Team workspaces. Existing API report exports are unchanged.

To configure an export, an eligible administrator opens a saved report, selects **Schedule export**, chooses daily or weekly, selects an approved S3 destination, and saves. Administrators need the existing `Manage reports` permission and an S3 bucket allowlisted by their organization. The help-center article at `https://docs.example.test/scheduled-exports` will be published on launch day. The in-product entry point will be available only after the feature flag is enabled for the workspace; rollout begins at 09:00 UTC and is expected to finish by 18:00 UTC, though a workspace may see it later if rollout is paused.

Exports use the workspace's existing S3 integration credentials. The service encrypts files in transit but does not manage encryption at rest in the customer's bucket. Files are retained in the bucket according to the customer's lifecycle policy; the product does not delete them. A failed export retries twice and then appears in the administrator activity log. No notification email is sent for a failure in this release.

The launch was originally planned for 2026-10-28 but moved after a staging test found that reports with more than 500 columns produced malformed headers. That defect is fixed. The implementation branch is `feature/export-scheduler`; it introduced `ExportScheduleRunner`, 14 database migrations, and a Redis queue named `scheduled-export-jobs`. The launch team held three meetings about button color, and the final **Schedule export** button is teal. Report tags remains in discovery.

## Completion criteria

A Business or Enterprise administrator can tell whether the feature is available to them, what outcome it provides, its significant limits and prerequisites, how to start, when to expect it, and where to get durable help. The email does not bury the point in implementation or incidental launch detail.
