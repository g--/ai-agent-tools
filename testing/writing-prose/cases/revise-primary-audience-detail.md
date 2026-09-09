# Case: revise a customer export announcement

## Test purpose

Test whether the skill removes accurate implementation detail that does not help the primary audience understand a feature or act on it.

## Intended artifact

A concise customer announcement for Business and Enterprise workspace administrators.

## Task

Revise the draft for its intended readers. Preserve supported facts and intended meaning. Do not introduce facts not present in the source material.

## Source material

Starting 4 November, Business and Enterprise workspace administrators can schedule a saved report to export as CSV to an approved S3 bucket each day or week. Administrators need `Manage reports` permission and an allowlisted S3 bucket. The first export runs in the next scheduled window rather than immediately. The help article is `https://docs.example.test/scheduled-exports`.

The implementation added `ExportScheduleRunner`, fourteen database migrations, and a Redis queue named `scheduled-export-jobs`. The final Schedule export button is teal.

## Draft to revise

Subject: Scheduled exports use a new Redis queue

We added `ExportScheduleRunner`, fourteen database migrations, and the `scheduled-export-jobs` Redis queue so administrators can schedule CSV exports.

The Schedule export button is teal. Business and Enterprise workspaces can use it to send a saved report to an allowlisted S3 bucket daily or weekly.

## Evaluation criteria

The revision leads with the customer-relevant capability and preserves eligibility, prerequisites, schedule, delivery timing, and help link. It removes implementation and design details that do not help administrators decide whether the feature matters or how to use it.
