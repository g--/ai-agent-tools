# Case: revise an upload incident update

## Intended artifact

A customer-facing status-page update during an EU document-upload incident.

## Task

Revise the draft for its intended readers. Preserve supported facts and intended meaning. Do not introduce facts not present in the source material.

## Source material

Between 14:07 and 14:36 UTC, 8.4% of EU document-upload requests returned HTTP 502 and 17% took longer than 30 seconds. New uploads have succeeded at normal latency for five consecutive minutes. Existing document views/downloads, search, authentication, billing, API reads, scheduled exports, and US-region uploads are unaffected.

Customers whose upload did not show a completion confirmation should check whether the document appears in their workspace before retrying. They may retry if it does not appear; retrying a completed upload can create a duplicate. The team has not confirmed whether any documents were lost. Current evidence suggests malformed input may have caused repeated memory pressure in a third-party PDF parser, but this is a working hypothesis. The next update will be posted by 15:15 UTC.

## Draft to revise

## Upload incident resolved

A third-party PDF parser caused the EU upload outage. No documents were lost, and the service is fully resolved.

If you experienced an upload failure, retry your upload now. The team will post another update at 15:15 UTC.

## Evaluation criteria

The revision preserves the observed period and recovery state without calling the incident resolved. It distinguishes the working hypothesis from confirmed cause, does not claim documents were not lost, retains safe retry guidance, identifies unaffected services, and gives the next-update time.
