# Case: reject conflicting discounts

## Intended artifact

A Git commit message for engineers investigating API behavior in history.

## Task

Write a Conventional Commit with the repository's Gitmoji format. Include a body only when it preserves material history that the subject and diff cannot.

## Source material

Checkout requests containing both `couponCode` and `giftCardCode` previously returned success while applying only the coupon. Clients interpreted the response as confirmation that both discounts were applied. The API now rejects these requests with HTTP 422 and `multiple_discount_types`.

The patch renames `validateCoupon` and adds a conditional in `checkout.ts`. The implementation branch is `fix/discounts-422`; the change was reviewed in a 47-minute meeting. Issue #4821 tracks the customer report.

## Completion criteria

The short-log subject makes the behavioral change findable. The output does not narrate function renames, files, or line edits. If it includes a body, it preserves the prior behavior and why rejection matters. Put the issue reference in an appropriate trailer.
