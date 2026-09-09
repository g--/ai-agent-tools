# Case: revise a rollout update

## Test purpose

Test whether the skill combines closely related points into coherent paragraphs instead of preserving a sequence of tiny, mechanically separated paragraphs.

## Intended artifact

A concise update for engineers and support staff about a staged migration rollout.

## Task

Revise the draft for its intended readers. Preserve supported facts and intended meaning. Do not introduce facts not present in the source material.

## Source material

The service now reads customer preferences from PostgreSQL after a staged migration from host-local JSON files. JSON files remain because rollback depends on them. The migration took three minutes for two million customers in staging; production has twelve million customers, so deployment must occur outside 09:00–17:00 UTC traffic peaks. Parser unit tests passed. Before production rollout, the release owner must run the migration against the anonymized staging fixture, confirm zero skipped records and zero JSON-backed reads, then remove the fixture.

## Draft to revise

Customer preferences now read from PostgreSQL.

The service previously used host-local JSON files.

Requests routed to another host could not reliably read those files.

This is a staged migration.

The JSON files remain.

Rollback depends on them.

The staging migration took three minutes for two million customers.

Production has twelve million customers.

Deploy outside 09:00–17:00 UTC traffic peaks.

Parser unit tests passed.

Before rollout, run the migration against the anonymized staging fixture.

Confirm zero skipped records.

Confirm zero JSON-backed reads.

Remove the fixture.

## Evaluation criteria

The revision groups related facts into readable paragraphs while retaining the migration outcome, rollback boundary, deployment constraint, completed unit-test status, and remaining validation steps. It does not turn the update into a dense wall of text, a text-heavy list, or an unsupported claim.
