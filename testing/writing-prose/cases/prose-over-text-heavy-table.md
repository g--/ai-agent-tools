# Case: explain tenant-isolation approaches

## Intended artifact

A decision memo section for engineering leadership comparing two approaches to tenant isolation.

## Task

Write the comparison and recommendation section.

## Source material

All customer data currently shares one PostgreSQL cluster. Application queries add a `tenant_id` predicate. The security review found no known cross-tenant exposure, but a future path that bypasses the query builder could omit the predicate. The on-call team already operates backups and recovery for the shared cluster but has not operated database-per-tenant routing.

One approach retains the shared database and adds row-level security for tenant-scoped roles while keeping application predicates. It also adds query-log monitoring and requires validation of scheduled exports and administrative access. The second approach creates one database per tenant and adds routing to the API and workers, incremental tenant migration, per-tenant backups, and new incident procedures. The first is estimated at eight engineer-weeks; the second at least 22. The available capacity before year end is 14 engineer-weeks.

The database dashboard is being moved to a new folder. The team is ordering new on-call stickers. A draft routing package is named `tenant-router-v3`.

## Completion criteria

The output gives a fair comparison and recommendation in prose. It does not put option descriptions, rationale, or trade-offs into table cells. It distinguishes the 8- and 22-engineer-week estimates from observed facts and explains the capacity implication.
