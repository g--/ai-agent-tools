# Case: PR description without ticket dependence

## Intended artifact

A pull request description for engineers reviewing a change. Readers may see the pull request without having read the linked ticket.

## Task

Write the pull request description.

## Source material

The service currently stores customer preferences in individual JSON files on each application host. This works for one host but prevents reliable reads after a request is routed to another host. The team is moving preferences to PostgreSQL so requests can be served by any host.

This pull request adds the `customer_preferences` table, migrates existing JSON files during deployment, and changes the read path to use PostgreSQL. It does not delete the JSON files yet; rollback still depends on them. The migration takes about three minutes in staging for 2 million customers. Production is expected to have 12 million customers, so deployment should be scheduled outside the 09:00–17:00 UTC traffic peak.

The linked ticket is #4821.

## Completion criteria

A reviewer can understand why the change exists, what this pull request changes, the important rollout constraint, and how #4821 relates to the work without opening the ticket.
