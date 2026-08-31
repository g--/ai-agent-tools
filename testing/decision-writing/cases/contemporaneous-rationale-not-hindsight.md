# Case: retire webhook API v1

## Intended artifact

An accepted decision memo for API maintainers and future readers investigating the retirement.

## Task

Write the decision memo.

## Source material

On 2026-09-25, webhook API v1 uses a shared workspace secret, lacks an event schema version, requires a compatibility serializer across four event producers, and has a separate retry path. The support team recorded 19 v1 signature-related tickets in the preceding quarter. API v2 uses rotating delivery keys, schema versions, and idempotency keys.

The public deprecation policy requires at least 180 days' notice, migration documentation, and direct enterprise outreach. The API team has eight engineer-weeks in Q4. Options considered were: retain v1 indefinitely; retire it on 2027-04-01 after notice and migration help; retire it on 2026-12-01; or proxy v1 through the v2 gateway. The April option fits Q4 capacity and the notice policy. December violates the ordinary notice period, and no active security incident exists. Indefinite support retains the compatibility burden and blocks delayed invoice events. The proxy is estimated at five engineer-weeks but retains legacy serializer and retry semantics.

Maya accepted retirement on 2027-04-01. Developer relations will publish migration documentation by 2026-10-20. Enterprise success managers will contact assigned accounts by 2026-11-15. API leadership reviews progress on 2027-01-15.

In 2027, the team observed fewer webhook incidents after retirement. The developer portal is also redesigning its navigation, and an internal poll preferred the dashboard name “event delivery center.”

## Completion criteria

The memo records the evidence and trade-offs known on 2026-09-25. It explains the selected timing relative to indefinite support and faster retirement. It does not use the later reduction in incidents as evidence for the original decision. It includes the supplied owners, dates, and review point.
