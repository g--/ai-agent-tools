# Case: revise a tenant-isolation comparison

## Test purpose

Test whether the skill removes paragraph-length option analysis from table cells while preserving an accurate, decision-useful comparison, estimates, and recommendation.

## Intended artifact

A decision memo section for engineering leadership comparing two tenant-isolation approaches.

## Task

Revise the draft for its intended readers. Preserve supported facts and intended meaning. Do not introduce facts not present in the source material.

## Source material

All customer data shares one PostgreSQL cluster. Application queries add a `tenant_id` predicate. The security review found no known cross-tenant exposure, but a future path that bypasses the query builder could omit the predicate. The on-call team operates shared-cluster backups and recovery but has not operated database-per-tenant routing.

The shared-database approach retains application predicates, adds row-level security for tenant-scoped roles and query-log monitoring, and requires scheduled-export and administrative-access validation. It is estimated at eight engineer-weeks. Database per tenant requires API and worker routing, incremental migration, per-tenant backups, and new incident procedures. It is estimated at least 22 engineer-weeks. The available capacity is 14 engineer-weeks before year end.

## Draft to revise

| Option | Assessment |
| --- | --- |
| Shared database plus row-level security | This option retains the existing shared-cluster operations while adding defense in depth through row-level security and query-log monitoring, but it requires scheduled-export and administrative-access validation before it can be released. It is estimated at eight engineer-weeks. |
| Database per tenant | This option requires API and worker routing, incremental tenant migration, per-tenant backups, and new incident procedures which the on-call team has not operated, and it is estimated at least 22 engineer-weeks, more than the team can deliver before year end. |

Recommend the shared-database approach.

## Evaluation criteria

The revision keeps option descriptions, reasoning, trade-offs, and the recommendation readable without paragraph-length table cells. It preserves the observed system/operations facts, identifies estimates as estimates, and explains why the current capacity affects the comparison.
