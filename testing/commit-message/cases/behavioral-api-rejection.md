# Case: explain an intentional compatibility change

## Intended artifact

A Git commit message that future engineers will read while investigating a client-visible API change.

## Task

Write a commit subject and include a body only if it earns its place.

## Source material

The checkout API previously accepted a request containing both `couponCode` and `giftCardCode`, then silently applied only the coupon. Clients interpreted the successful response as confirmation that both discounts had applied. The API now rejects this combination with HTTP 422 and error code `multiple_discount_types`.

The API contract already documents HTTP 422 for validation failures. Support will notify the two known third-party clients before deployment. This change is part of ticket CHECKOUT-913.

## Completion criteria

The subject names the changed behavior rather than merely the implementation or ticket. Include a body if it preserves why rejecting the request is safer than the previous successful response. Do not invent a migration timeline or claim that clients have already been notified.
