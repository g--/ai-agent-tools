# Case: tenant isolation for the analytics platform

## Intended artifact

A proposed architecture decision record for the platform steering group and the engineers who will implement it. It must remain useful to a future reader investigating why isolation was chosen.

## Task

Write the decision record. Use a status of `Proposed`; the steering group has not selected an option yet.

## Source material

### Decision to make

Before signing the first enterprise customers, decide how the analytics platform will isolate customer data for the next 18 months. The decision affects the shared event-ingestion API, query service, scheduled exports, and support tooling. The target date for a decision is 2026-10-15 so procurement can complete before the annual customer conference. Maya Chen, VP Engineering, owns the decision. Priya Nair (security), Luis Romero (data platform), and Aisha Patel (customer success) advise; the steering group accepts or rejects the proposal.

### Contemporaneous world state

As of 2026-09-18, the platform has 43 paying customers, all on one PostgreSQL cluster in `us-east-1`. Each event row contains `tenant_id`; application queries add a tenant predicate through the query builder. The event store contains 2.8 TB compressed and grows by about 180 GB each month. The cluster's current 30-day average CPU utilization is 41%, and peak weekday query load reaches 68%. The data team estimates the current cluster has capacity for approximately 18 more months at the forecasted growth rate, but that estimate assumes no single customer contributes more than 30% of query volume.

The company expects to sign between three and six enterprise customers in the next two quarters. Sales says the largest prospect, Northstar Health, will require a documented isolation approach before contract signature. Northstar has not required a dedicated database or region. Two other prospects have asked whether data remains in the United States; all current production data is in `us-east-1`. No signed contract currently requires EU data residency, HIPAA, or a customer-managed encryption key. The legal team's 2026-09-12 memo says SOC 2 controls can support either shared or dedicated databases if access control and audit evidence are adequate; it does not endorse a specific architecture.

The security review found no known cross-tenant data exposure. It identified two risks: a future query path that bypasses the query builder could omit the tenant predicate, and support engineers can run read-only SQL through a bastion host after approval. The bastion logs queries but does not automatically flag queries missing a tenant filter. Row-level security has not been enabled in production. A proof of concept enabled it on a staging copy without measurable latency change on its 12 representative queries; the test did not include the monthly export job.

The current on-call team is five engineers. They rotate weekly and already operate PostgreSQL backups, point-in-time recovery, and schema migrations for the shared cluster. They have not operated database-per-tenant routing or a multi-region deployment. The incident response objective is to restore the service within four hours; the current shared-cluster recovery exercise completed in two hours and 20 minutes in July. The next recovery exercise is scheduled for 2026-11-05.

The 2027 infrastructure budget has not been approved. Finance supplied planning numbers, not quotes: an additional dedicated production database is estimated at $2,400/month, and a second region is estimated at $7,000/month before data-transfer charges. The platform team has 14 engineer-weeks available before 2026-12-31 after committed roadmap work. The same team is scheduled to begin a six-engineer-week billing dashboard in November; its prototype uses chart color `#7C3AED`. The company offsite is scheduled for 2026-10-02.

### Decision criteria

The steering group agreed that the approach must: prevent accidental cross-tenant reads through defense in depth; produce audit evidence suitable for enterprise security reviews; preserve the four-hour recovery objective; fit within 14 engineer-weeks before year end; and avoid committing to an irreversible regional topology before a signed residency requirement exists. Lower ongoing operational cost and an upgrade path for a future dedicated-tenant offering are preferences, not hard constraints.

### Options considered

1. Keep the single shared database and rely on application-level `tenant_id` predicates. Add an automated query-log check for missing predicates and improve bastion approval records.
2. Keep the shared database, enable PostgreSQL row-level security for tenant-scoped application roles, retain application predicates, and add query-log checks. Run the export job against staging before production rollout.
3. Create one database per tenant in `us-east-1`, add routing in the API and workers, and move tenants incrementally. Keep the current shared database during the migration.
4. Deploy a separate EU region and begin offering regional tenancy immediately. This would also require cross-region deployment automation and a new disaster-recovery runbook.

### Evaluation inputs

Luis estimates option 1 takes four engineer-weeks; option 2 takes eight; option 3 takes at least 22; and option 4 takes at least 34. Priya considers option 1 insufficient defense in depth because a missing predicate can still expose data. Priya considers option 2 materially stronger because both application predicates and the database policy constrain reads, but wants evidence for scheduled exports and administrative access. Aisha believes a documented shared-database defense-in-depth approach can answer current prospect questions; she cannot promise that it will satisfy every future procurement questionnaire. Luis believes option 3 is a plausible future product tier but would add routing, migration, backup, and incident complexity now. Finance's planning numbers make options 3 and 4 more expensive, but no approved budget decision has been made. The legal memo does not require option 4, and no signed requirement currently needs it.

Maya's preliminary preference is option 2, conditional on a successful export-job test and a security review of administrative access. This preference is not a decision.

### Proposed follow-through if option 2 is accepted

Priya will review row-level-security policies and the administrative-access procedure. Luis will add the policies, query-log check, and export-job staging test. The release should be blocked if the export job cannot read the rows it is authorized to export or if the test reveals a material latency regression. The platform team will document the security controls for sales by 2026-10-31. Revisit the decision when a signed customer requires a dedicated database, customer-managed key, or data residency outside `us-east-1`, or at the 2027 infrastructure-planning meeting—whichever happens first.

The staging proof of concept used PostgreSQL 16.3; production uses PostgreSQL 16.2 and its routine maintenance upgrade is penciled in for October. The query-builder package was renamed from `query-kit` to `data-access` in August. The incident channel is `#platform-incidents`, and Northstar's account executive prefers slide decks with navy backgrounds.

## Completion criteria

The world state must be understandable without revealing Maya's preliminary preference or implying option 2. The record must distinguish hard criteria from preferences, fairly describe all four options, and make the conditional follow-through and review triggers actionable if option 2 is accepted.
