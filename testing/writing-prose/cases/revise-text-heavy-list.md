# Case: revise a storage-migration description

## Test purpose

Test whether the skill turns paragraph-length list items containing connected migration reasoning into readable prose without dropping scope, rollback, or deployment facts.

## Intended artifact

A short pull request description for engineers reviewing a storage migration.

## Task

Revise the draft for its intended readers. Preserve supported facts and intended meaning. Do not introduce facts not present in the source material.

## Source material

Customer preferences are stored in JSON files on individual application hosts, so requests routed to another host cannot reliably read them. This change adds a PostgreSQL table, migrates JSON files during deployment, and switches reads to PostgreSQL. JSON files remain because rollback depends on them. The staging migration took three minutes for two million customers; production has twelve million customers. Deployment must run outside 09:00–17:00 UTC traffic peaks. The API response schema is unchanged.

## Draft to revise

- This change moves customer preferences to PostgreSQL because requests routed to another host cannot reliably read the JSON files stored on individual application hosts, and it adds a table, migrates the files during deployment, and changes reads while leaving the API response schema unchanged.
- The JSON files remain because rollback depends on them, and deleting them now would remove the recovery route if PostgreSQL reads fail after cutover.
- The staging migration took three minutes for two million customers, and production has twelve million, so deployment must run outside 09:00–17:00 UTC traffic peaks.

## Evaluation criteria

The revision retains the outcome, scope, unchanged API schema, rollback rationale, and traffic constraint. It uses prose for the connected explanation instead of paragraph-length list items and adds no unsupported operational details.
