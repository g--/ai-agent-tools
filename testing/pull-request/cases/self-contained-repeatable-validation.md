# Case: migrate customer preferences to PostgreSQL

## Intended artifact

A pull request description for engineers reviewing a storage migration.

## Task

Write the pull request description.

## Source material

Customer preferences are stored in JSON files on individual application hosts. Requests routed to another host cannot reliably read them. This pull request adds a PostgreSQL table, migrates the JSON files during deployment, and switches the read path to PostgreSQL. It retains the JSON files because rollback depends on them. It implements #4821.

The staging migration took three minutes for two million customers. Production has twelve million customers, so deployment must run outside 09:00–17:00 UTC traffic peaks. Unit tests cover the parser only. Before rollout, a release owner must run the staging migration against the anonymized `preferences-2m` fixture, confirm no records were skipped and zero reads use JSON, then remove the fixture. The relevant commands are:

```sh
./scripts/migrate-preferences --environment staging --fixture preferences-2m
./scripts/check-preferences --environment staging --expect-postgres-reads
./scripts/delete-fixture --environment staging preferences-2m
```

The migration script has 436 lines, uses `copyFrom`, and was renamed twice during review. The deploy dashboard may be recolored orange.

## Completion criteria

The description explains purpose and scope without making #4821 the explanation. It distinguishes parser unit tests already completed from the remaining repeatable validation plan. The plan includes setup, commands, expected results, traffic constraint, and cleanup. It does not claim that CI/CD or local testing covers the production migration.
