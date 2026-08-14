# @pikku/addon-stripe

## 0.1.6

### Patch Changes

- 31b0085: Resolve every entry point under `dist`

  `imports["#pikku"]` named `./.pikku/pikku-types.gen.ts` — a TypeScript file, at
  runtime, inside `node_modules` — and `files` published a second copy of
  `.pikku` at the package root whose generated output imported a `../src/` and
  `../types/` the tarball did not contain. The `pikku-bootstrap.gen.js` consumers
  import through the `./.pikku/*` subpath only ever existed under `dist`.
  Everything resolved through the workspace link and none of it resolved on
  install.

  Every entry point now points at the built copy, and `files` is just
  `["dist"]`. The addon's own build resolves `#pikku` through tsconfig
  `paths`, so nothing has to reach into the source tree. Consumer import
  specifiers are unchanged.

- f74a5d6: Ship `types/application-types.d.ts` in the published package.

  The build copied `.pikku` into `dist` but left `types` behind, and TypeScript
  never emits a hand-written `.d.ts` to outDir — so `dist/types` did not exist.
  Every generated file under `dist/.pikku` imports `SingletonServices`, `Services`,
  `Config` and `UserSession` from `../../types/application-types.d.js`, which left
  consumers typechecking against a module that was not there: 14 errors inside
  `node_modules` for an app that merely depends on the addon.

- fd4e79a: Reveal the Stripe secrets instead of handing `SecretValue` to the SDK

  `@pikku/core` changed `SecretService.getSecret` from `Promise<T>` to
  `Promise<SecretValue<T>>` in 0.12.77, but the peer range stayed `^0.12.74` — so
  the addon installs happily against both contracts and only one of them works.
  Against 0.12.77+ the constructor still succeeds, because `new Stripe(key)` only
  stores the value; the throw lands on the first API call, where the SDK builds
  `'Bearer ' + key` and `SecretValue[Symbol.toPrimitive]` raises
  `SecretCoercionError`. Every Stripe call failed, and the stack pointed at the
  SDK rather than at the key.

  `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` are now revealed at the service
  factory, and the peer/dev range starts at the release that introduced
  `SecretValue`.

## 0.1.5

### Patch Changes

- 84fa090: Update to `@pikku/core` 0.12.74 and `@pikku/cli` 0.12.96, and migrate the
  breaking changes that came with them: `wireSecret`/`wireVariable`/`wireCredential`
  are now `defineSecret`/`defineVariable`/`defineCredential`, `OAuth2Client` is gone
  from `@pikku/core/oauth2` (OAuth tokens are owned by the platform credential
  service and resolved per request), `AIEmbeddingService` exposes
  `embedQuery`/`embedDocuments` instead of `embed`/`embedMany`, `LocalContent`
  takes a `JWTService`, and `SecretService` is confined to service factories.

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
