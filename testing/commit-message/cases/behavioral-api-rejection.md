# Case: API rejection changes checkout semantics

## Test purpose

Test whether the skill writes a behavior-focused, history-useful commit message from a diff and surrounding source material, including a body only when the client-safety rationale adds value.

## Intended artifact

A Git commit message that future engineers will read while investigating a client-visible API change.

## Task

Write the commit message.

## Source material

The checkout API previously accepted a request containing both `couponCode` and `giftCardCode`, then silently applied only the coupon. Clients interpreted the successful response as confirmation that both discounts had applied. The API now rejects this combination with HTTP 422 and error code `multiple_discount_types`.

The API contract already documents HTTP 422 for validation failures. Support will notify the two known third-party clients before deployment. This change is part of ticket CHECKOUT-913.

## Diff

```diff
diff --git a/src/checkout/discounts.ts b/src/checkout/discounts.ts
index 81c438f..d1b39c7 100644
--- a/src/checkout/discounts.ts
+++ b/src/checkout/discounts.ts
@@ -8,10 +8,21 @@ export async function applyDiscounts(input: CheckoutInput) {
-  if (input.couponCode) {
-    return applyCoupon(input.couponCode);
+  if (input.couponCode && input.giftCardCode) {
+    throw new ApiError({
+      status: 422,
+      code: "multiple_discount_types",
+      message: "couponCode and giftCardCode cannot be used together",
+    });
   }
 
+  if (input.couponCode) return applyCoupon(input.couponCode);
+  if (input.giftCardCode) return applyGiftCard(input.giftCardCode);
   return noDiscount();
 }
diff --git a/src/checkout/discounts.test.ts b/src/checkout/discounts.test.ts
index 3af2e31..edfd2aa 100644
--- a/src/checkout/discounts.test.ts
+++ b/src/checkout/discounts.test.ts
@@ -42,7 +42,14 @@ describe("applyDiscounts", () => {
-  it("prefers a coupon when both discount types are supplied", async () => {
-    expect(await applyDiscounts({ couponCode: "SAVE10", giftCardCode: "CARD50" }))
-      .toMatchObject({ type: "coupon" });
+  it("rejects requests containing both discount types", async () => {
+    await expect(applyDiscounts({ couponCode: "SAVE10", giftCardCode: "CARD50" }))
+      .rejects.toMatchObject({
+        status: 422,
+        code: "multiple_discount_types",
+      });
   });
 });
```

## Evaluation criteria

The subject names the changed behavior rather than merely the implementation or ticket. Include a body if it preserves why rejecting the request is safer than the previous successful response. Do not invent a migration timeline or claim that clients have already been notified. The commit message must be supported by both the source material and diff.