# Case: retire webhook API v1

## Intended artifact

An accepted decision memo for API maintainers, support, and customers who later need to understand the retirement timeline.

## Task

Write the decision memo. The decision has already been made: retire webhook API v1 on 2027-04-01 and provide the migration path described below.

## Source material

### Contemporaneous world state

On 2026-09-25, the service delivers account and invoice events through webhook API v1 and v2. Version 1 signs payloads with a shared workspace secret and sends event payloads without an event schema version. Version 2 signs each delivery with a rotating key, includes a schema version, supports idempotency keys, and is documented in the developer portal.

There are 1,246 active webhook integrations: 913 have received a v2 delivery in the last 30 days, 211 only use v1, and 122 have no successful delivery in the last 90 days. The counts are based on delivery logs and may include integrations owned by departed employees. Of the 211 v1-only integrations, 37 belong to customers on enterprise plans, 56 to business plans, and 118 to free plans. Six enterprise customers have contractual support commitments through 2027; none names webhook v1. The support team has received 19 v1 signature-related tickets in the last quarter and two v2 signature-related tickets.

Maintaining v1 requires a compatibility serializer used by four event producers and a separate retry path. The on-call team spent an estimated 31 engineer-hours on v1-specific incidents in the past six months. That estimate excludes time spent by customer support. The planned Q4 feature, delayed invoice events, cannot safely expose its full payload on v1 because v1 clients may reject unknown fields. The API team has eight engineer-weeks available in Q4 after an unrelated OAuth audit. The company will not renew the legacy webhook gateway contract after 2027-06-30; the gateway can operate through that date but its vendor has announced no new features.

The current public API deprecation policy says to give at least 180 days' notice for a stable API version, publish migration documentation, and contact enterprise customers directly. It allows an emergency retirement only for an active security incident approved by the CISO. Legal confirmed on 2026-09-20 that the policy, not a separate contract term, governs v1 for current customers. Product estimates that 70% of v1-only customers can migrate by changing the endpoint version and updating signature verification; this is an estimate based on interviews with 12 customers, not a measured result. The developer portal team is concurrently redesigning its navigation, and their working dashboard name is “event delivery center.”

### Options considered before the decision

1. Continue v1 indefinitely while delaying incompatible event improvements.
2. Retire v1 on 2027-04-01 after more than 180 days' notice, migration tools, direct enterprise outreach, and usage-based reminders.
3. Retire v1 on 2026-12-01 to reduce maintenance sooner.
4. Keep v1 delivery but proxy it through the v2 gateway without requiring customer migration.

### Criteria and evaluation

The decision needed to preserve the public deprecation policy, give customers a practical migration path, reduce v1 operational and compatibility cost, and fit Q4 engineering capacity. Option 1 preserves compatibility but prevents the delayed-invoice feature and retains known support burden. Option 2 meets the notice policy, allows a staged migration campaign, and fits the available capacity: two weeks for migration diagnostics, three for documentation and tooling, two for notifications, and one contingency week. Option 3 violates the ordinary notice period and there is no active security incident. Option 4 would keep compatibility but retains the legacy serializer and retry semantics, and Luis estimates it would take five engineer-weeks with uncertain behavior under retries.

### Accepted decision and follow-through

On 2026-09-25, Maya Chen accepted option 2: retire webhook API v1 on 2027-04-01. The developer relations team will publish the migration guide and dashboard by 2026-10-20. Support will email v1-only owners at 180, 90, 30, and 7 days before retirement; enterprise success managers will contact their assigned enterprise accounts by 2026-11-15. The API team will expose a dashboard showing v1 deliveries and migration status. The retirement is blocked if the migration guide or dashboard is unavailable by 2026-10-20, and the API leadership group will review status on 2027-01-15. An active v1 security incident may accelerate retirement only through the existing CISO approval process.

The first v1 endpoint was introduced during a 2019 hackathon. The support team's quarterly offsite is 2026-11-03. A customer once sent a payload containing 1,024 emoji characters.

## Completion criteria

The memo must preserve the state as known on 2026-09-25, distinguish the 70% migration estimate from observed usage data, explain why the accepted timing was chosen over faster retirement and indefinite support, and state actionable owners, dates, blocks, and review conditions.
