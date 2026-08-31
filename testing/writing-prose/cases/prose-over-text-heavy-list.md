# Case: explain a staged preference migration

## Intended artifact

A short pull request description for engineers reviewing a storage migration.

## Task

Write the description.

## Source material

Customer preferences are stored in JSON files on each application host. Requests routed to another host cannot reliably read those preferences. This change adds a PostgreSQL table, migrates the JSON files during deployment, and switches reads to PostgreSQL.

The JSON files remain after this deployment because rollback depends on them. Deleting them now would remove the recovery route if PostgreSQL reads fail after cutover. The staging migration took three minutes for two million customers. Production has twelve million customers, so schedule the deployment outside 09:00–17:00 UTC traffic peaks. The migration does not change the API response schema.

The migration script has 436 lines, uses `copyFrom`, and was renamed twice during review. The team discussed using orange for the deploy dashboard.

## Completion criteria

The description explains the rollback and scheduling rationale as connected prose, not as paragraph-length list items. A reviewer can understand the outcome, material scope, retained JSON files, and deployment constraint without implementation trivia.
