# Case: revise a retry-delay notice

## Test purpose

Test whether the skill removes hedging that adds no useful uncertainty while retaining precise, supported operational information.

## Intended artifact

A short internal notice for support staff about a known retry behavior.

## Task

Revise the draft for its intended readers. Preserve supported facts and intended meaning. Do not introduce facts not present in the source material.

## Source material

After a failed customer-notification delivery, the service waits exactly 30 seconds before one retry. The retry setting is documented in the notification service configuration and has not changed in the current release. Support should tell customers to wait at least one minute before reporting a missing notification.

## Draft to revise

The service may possibly take approximately 30 seconds to retry a failed customer-notification delivery.

Customers might want to perhaps wait around one minute before reporting a missing notification.

## Evaluation criteria

The revision states the documented retry delay and support guidance precisely. It removes hedging that does not communicate real uncertainty and does not imply more retries or a changed release behavior.
