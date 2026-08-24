# Case: commit message

## Intended artifact

A Git commit message that will be read later by engineers investigating behavior in the history.

## Task

Write a commit subject and, only if it earns its place, a commit body.

## Source material

The checkout API accepted a request with both `couponCode` and `giftCardCode`, but silently applied only the coupon. Clients interpreted a successful response as confirmation that both discounts had been applied. The API now rejects such requests with HTTP 422 and the error code `multiple_discount_types`.

## Completion criteria

The subject makes the behavioral change clear. Include a body only if it gives future readers material context that the subject cannot carry.
