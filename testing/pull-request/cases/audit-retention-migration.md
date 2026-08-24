# Case: explain a migration with a review boundary

## Intended artifact

A pull request description for security, data-platform, and application reviewers. The pull request contains a schema migration and a backfill, so reviewers need to understand its safety boundary.

## Task

Write the pull request description.

## Source material

The account service stores password-reset audit records for 30 days. A new enterprise contract requires retaining those records for seven years. The records contain an account ID, request timestamp, delivery channel, and whether a reset token was used; they do not contain token values or email addresses.

This pull request adds an append-only `password_reset_audit_archive` table, copies existing records from the 30-day table, and writes future records to both tables. It adds a nightly verification job that compares counts and a dashboard for archive-write failures. The existing 30-day deletion job continues unchanged. No records are deleted from the existing table in this change.

For the first 14 days, the application will write to both tables. Security will review the verification results before a later pull request changes the deletion policy and removes the short-retention table. The archive table is encrypted with the account service's existing database key. It is not a new customer-facing feature.

The linked compliance ticket is SEC-2406.

## Completion criteria

A reader understands why the migration exists, the retention boundary this pull request establishes, why dual writes and verification are used, what remains for a later change, and how SEC-2406 relates to the work. The description identifies the safety-relevant behavior without claiming that the seven-year policy is fully implemented by this pull request.
