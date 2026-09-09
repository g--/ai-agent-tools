# Case: revise asymmetric tenant-isolation options

## Test purpose

Test whether the skill makes viable alternatives comparably concrete before evaluating the selected approach.

## Intended artifact

A proposed decision record for engineering leadership deciding how to strengthen tenant isolation.

## Task

Revise the draft for its intended readers. Preserve supported facts and intended meaning. Do not introduce facts not present in the source material.

## Source material

All customer data shares one PostgreSQL cluster. Application queries add a `tenant_id` predicate. The security review found no known cross-tenant exposure, but a future path that bypasses the query builder could omit the predicate. The on-call team operates shared-cluster backups and recovery but has not operated database-per-tenant routing.

The decision criteria are defense in depth, enterprise-review audit evidence, a four-hour recovery objective, and delivery within 14 engineer-weeks before year end. Lower operating cost is a preference. Option A retains the shared database and application predicates, adds query-log checks, and improves bastion approval records. Option B retains the shared database, adds row-level security for tenant-scoped roles and query-log monitoring, and validates scheduled exports and administrative access. Option C creates one database per tenant, adds API and worker routing, migrates tenants incrementally, and introduces per-tenant backup and incident procedures. Luis estimates A at four engineer-weeks, B at eight, and C at least 22. Priya judges A insufficient defense in depth. Maya preliminarily prefers B if export and administrative-access validation succeeds.

## Draft to revise

## Options

**Option B: shared database with row-level security.** Keep application predicates, add row-level security for tenant-scoped roles, monitor for missing predicates, validate exports and administrative access, and retain familiar backup and recovery operations. The work is estimated at eight engineer-weeks.

**Option C: separate databases.** Use a database per tenant.

## Recommendation

Choose option B because it is clearly the safest option.

## Evaluation criteria

The revision describes all viable options at comparable resolution and evaluates them against the stated criteria. It attributes Luis's estimates, Priya's judgment, and Maya's preliminary preference rather than presenting them as neutral facts. It explains the 14-engineer-week constraint and does not treat the proposed record as an accepted decision.
