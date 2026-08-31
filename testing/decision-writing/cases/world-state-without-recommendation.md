# Case: tenant isolation proposal

## Intended artifact

A proposed decision record for the platform steering group. The group has not selected an option.

## Task

Write the decision record.

## Source material

As of 2026-09-18, all customer data shares one PostgreSQL cluster. Application queries add a `tenant_id` predicate through a query builder. The security review found no known cross-tenant exposure, but a future query path that bypasses the builder could omit the predicate. Row-level security is not enabled in production. The on-call team operates shared-cluster backups and recovery but has not operated database-per-tenant routing.

The decision must provide defense in depth, produce enterprise-review audit evidence, preserve a four-hour recovery objective, fit within 14 engineer-weeks before year end, and avoid an irreversible regional topology before a signed residency requirement exists. Lower ongoing cost is a preference rather than a hard constraint.

Option A retains the shared database and application predicates, adds query-log checks, and improves bastion approval records. Option B retains the shared database, adds row-level security for tenant-scoped roles and query-log checks, and validates scheduled exports and administrative access. Option C creates one database per tenant, adds API and worker routing, migrates tenants incrementally, and introduces per-tenant backup and incident procedures.

Priya considers option A insufficient defense in depth. Luis estimates options A, B, and C at four, eight, and at least 22 engineer-weeks respectively. Maya preliminarily prefers option B if export and administrative-access validation succeed. The database dashboard is moving folders, and the new on-call stickers are teal.

## Completion criteria

The world-state section contains the contemporaneous system facts, uncertainty, and operating capability without naming a preferred option or evaluation. The record distinguishes hard criteria from the cost preference, fairly describes all three options, labels Priya's view and Maya's preference as judgments rather than facts, and explains the capacity implication of Luis's estimates.
