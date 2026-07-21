# @pikku/addon-stripe

## 0.1.4

### Patch Changes

- 4ea93d7: Expand `@pikku/addon-stripe` to cover a full payment-taking app, not just
  server-to-server operations. Adds:

  - **Refunds:** `refundCreate`, `refundGet`, `refundList`.
  - **Products & Prices:** `productCreate/Get/List/Update`, `priceCreate/Get/List/Update` — build a catalog in code instead of the dashboard.
  - **Payment Intents lifecycle:** `paymentIntentGet`, `paymentIntentConfirm`, `paymentIntentCapture` (auth-then-capture), `paymentIntentCancel`. `paymentIntentCreate` now returns `clientSecret` and accepts an optional (rather than required) `paymentMethod` plus `automaticPaymentMethods`/`setupFutureUsage`, enabling client-side Stripe Elements / Payment Element flows.
  - **Setup Intents:** `setupIntentCreate` (save a card without charging) and `setupIntentGet`.
  - **Subscriptions:** `subscriptionCreate` (with `paymentBehavior: default_incomplete` for client-side first payment) alongside the existing get/update/cancel.
  - **Invoices:** `invoiceCreate/Get/List/Finalize/Send/Void/Pay` and `invoiceItemCreate`.
  - **Connect (marketplaces):** `accountCreate`, `accountGet`, `accountLinkCreate`, `transferCreate`, `payoutCreate`.
  - **Checkout:** `checkoutSessionCreate` gains inline `priceData` (dynamic amounts without a pre-created price), `paymentIntentData` (so one-off top-up metadata reaches the `payment_intent.succeeded` webhook that credits a wallet), `subscriptionData`, `allowPromotionCodes`, and `automaticTax`; setup-mode sessions no longer send line items.

  All additions are 1:1 typed wrappers over the Stripe SDK following the existing
  pattern, verified against `stripe-mock`.

  ## I/O normalization pass

  Every function across the addon (both the functions above and the pre-existing
  ones) has been normalized to a uniform convention: all input/output field names
  are camelCase, and genuine Unix-epoch-seconds timestamp fields are now
  `z.string().datetime()` ISO strings instead of raw numbers, built via real
  runtime conversion (not a type cast) so the schema's claims are actually
  enforced. `metadata` is deliberately excluded from both the casing and the
  recursive key transform — its keys and values pass through byte-for-byte in
  both directions — because a production webhook consumer outside this addon
  reads metadata keys by exact match on the Stripe side, and rewriting them here
  would break that round trip. Money amounts and enum/status vocabulary are
  unchanged (still integer minor units and Stripe's own string values); this is
  a casing + dates pass, not a functional rewrite. Verified against `stripe-mock`
  (43 assertions covering the addon; 4 pre-existing assertions for the legacy
  customer `/sources` endpoints — `customerCardAdd`/`Get`/`Remove` and the
  card-based half of `sourceDelete` — are skipped because stripe-mock does not
  implement those endpoints and returns unrelated fixture data for them
  regardless of caller, independent of this change).

## 0.1.3

### Patch Changes

- caa0266: Fix `#pikku` internal package alias to resolve to compiled JS in `dist/.pikku/` instead of the TypeScript source in `.pikku/`. Previously, the `imports` field pointed to `./.pikku/pikku-types.gen.ts`, causing `ERR_MODULE_NOT_FOUND` at runtime in plain Node.js (without tsx) because the re-exported `.gen.js` files only exist in `dist/.pikku/` after compilation.

## 0.1.2

### Patch Changes

- c9339b7: Fix package publishing to use `publishConfig.directory` so `#pikku` imports resolve correctly when consumed from npm.

## 0.1.1

### Patch Changes

- 092e991: Fix .pikku exports to resolve from dist/.pikku instead of root .pikku, preventing module-not-found errors in consumers
- 7a5d17a: Rename `node` config key to `addon` in pikku.config.json

## 0.1.0

Initial release.
