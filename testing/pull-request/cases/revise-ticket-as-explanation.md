# Case: revise a ticket-only preference migration PR

## Test purpose

Test whether the skill replaces a ticket-only PR summary with the outcome, rationale, and material scope a reviewer needs without opening linked work.

## Intended artifact

A pull request description for engineers reviewing a customer-preference storage migration.

## Task

Revise the draft for its intended readers. Preserve supported facts and intended meaning. Do not introduce facts not present in the source material.

## Source material

Customer preferences are stored in JSON files on individual application hosts. When a request is routed to another host, it cannot reliably read those files. This pull request adds a PostgreSQL table, migrates existing JSON files during deployment, and changes reads to PostgreSQL. The JSON files remain because rollback depends on them. The migration is part of #4821.

The staging migration took three minutes for two million customers. Production has twelve million customers, so deployment must run outside 09:00–17:00 UTC traffic peaks. No validation results were supplied.

## Draft to revise

## Summary

Implements #4821.

## Rollout

Deploy outside peak traffic.

## Evaluation criteria

The revision makes the purpose, scope, retained rollback path, and traffic constraint understandable without opening #4821. It uses the ticket as traceability rather than the explanation and makes the absence of supplied validation results visible without claiming checks passed.
