# Case: incident update

## Intended artifact

An update for customer-support and engineering staff during an incident. Customer-support staff need a concise, accurate statement they can use with affected customers.

## Task

Write the incident update.

## Source material

From 14:12 to 14:46 UTC, some users received duplicate invoice emails after updating their billing address. No duplicate charges occurred. The trigger was a retry introduced in release 2025.08.19; it resent the notification after a database timeout even when the original send had succeeded. The retry has been disabled, and engineers are preparing a fix that records the notification delivery state before retrying.

Support should tell customers that they may disregard duplicate invoices and that their account balance is unchanged. The next update is due at 16:00 UTC.

## Completion criteria

The update lets both audiences understand impact, current mitigation, safe customer guidance, and the next expected communication without overclaiming that the permanent fix is complete.
