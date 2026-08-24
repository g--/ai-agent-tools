# Case: preserve the reason for removing a fallback

## Intended artifact

A Git commit message that future engineers will read while investigating why the old fallback was removed.

## Task

Write a commit subject and include a body only if it preserves material context the subject cannot carry.

## Source material

The dashboard's new aggregation query was released behind the `dashboard_aggregation_v2` flag on 2026-03-10. The old query used a join pattern that skipped archived projects. The new query includes them and has had no errors or material latency regression for six weeks. Every production workspace has used the new query since 2026-04-01.

This commit removes the flag, the old query, its tests, and the temporary comparison metric. It does not change the aggregation result returned to users. The linked cleanup ticket is PLAT-1842.

## Completion criteria

The subject identifies the user- or system-relevant change. If a body is used, it preserves the reason the old behavior was removed and makes the ticket supplementary rather than the explanation. Do not list routine deleted files or tests.
