# Case: announce scheduled exports

## Intended artifact

A concise customer email announcing a new feature to eligible workspace administrators.

## Task

Write the email, including a subject line.

## Source material

Business and Enterprise workspace administrators can schedule one saved report to export as CSV to an approved S3 bucket each day or week starting 4 November. Administrators need the existing `Manage reports` permission and an allowlisted bucket. The first export runs in the next scheduled window rather than immediately. Free and Team workspaces are not eligible. The help article will be available at `https://docs.example.test/scheduled-exports` on launch day.

The implementation uses a Redis queue and fourteen database migrations. The launch button is teal. Engineering called the feature branch `feature/export-scheduler`.

## Completion criteria

The opening lets an eligible administrator recognize the feature and its benefit without saying “this email is for …,” “this announcement is for …,” or “this section explains …”. It states the relevant eligibility, how to start, and the non-immediate first delivery without including implementation or design trivia.
