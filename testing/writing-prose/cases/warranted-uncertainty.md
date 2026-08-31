# Case: customer incident update

## Intended artifact

A customer-facing status-page update during an upload incident.

## Task

Write the update.

## Source material

From 14:07 to 14:36 UTC, 8.4% of document-upload requests in the EU region returned HTTP 502 and 17% took longer than 30 seconds. New uploads have succeeded at normal latency for five consecutive minutes. Existing document views and downloads, search, authentication, billing, API reads, scheduled exports, and US-region uploads are unaffected.

Customers whose upload did not show a completion confirmation should first check whether the document appears in their workspace. They may retry if it does not appear; retrying a completed upload can create a duplicate. The team has not confirmed whether any documents were lost. The current evidence suggests malformed input may have caused repeated memory pressure in a third-party PDF parser, but this is a working hypothesis. The next update will be posted by 15:15 UTC.

The incident commander reduced `UPLOAD_PROCESSOR_CONCURRENCY` from 24 to 8. Heap profiles, pod IDs, a stack trace, and the affected customer's name are attached to INC-771.

## Completion criteria

Customers can identify the affected service, period, safe retry action, unaffected services, known recovery state, unconfirmed data-loss status, and next update. The draft distinguishes confirmed facts from the working hypothesis and omits internal diagnostic and customer-identifying details.
