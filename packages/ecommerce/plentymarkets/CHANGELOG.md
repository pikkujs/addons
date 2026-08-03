# @pikku/addon-plentymarkets

## 0.2.0

### Minor Changes

- 109bb23: Add webhook ingress and catalog/order resync primitives:

  - `plentymarketsWebhookHandler` + `plentymarketsHTTPRoutes` — a `POST
/webhooks/plentymarkets` receiver (declared as a route contract via
    `defineHTTPRoutes`, mounted by the consumer) that enqueues each event onto the
    `plentymarkets-webhook-event` queue for the consuming app to resync.
  - `getOrder` now takes `withRelations`, and order schemas carry
    `orderReferences` / `reverseOrderReferences` — so a parent order and its credit
    notes can be reconciled.
  - `searchOrderPayments` — the payments booked against one order (POST
    /payments/search), for summing an order's paid/credited totals.
  - `getVariationSyncData` — a variation's per-currency gross prices + availability
    id, resolving each sales-price row's currency explicitly or by looking its
    `salesPriceId` up against `/items/sales_prices/{id}` (with the `-1`
    all-currencies sentinel).
  - `listAvailabilities` — the `GET /availabilities` catalog dimension.
  - The schemas and their inferred types are now re-exported from the package root.

### Patch Changes

- 84fa090: Update to `@pikku/core` 0.12.74 and `@pikku/cli` 0.12.96, and migrate the
  breaking changes that came with them: `wireSecret`/`wireVariable`/`wireCredential`
  are now `defineSecret`/`defineVariable`/`defineCredential`, `OAuth2Client` is gone
  from `@pikku/core/oauth2` (OAuth tokens are owned by the platform credential
  service and resolved per request), `AIEmbeddingService` exposes
  `embedQuery`/`embedDocuments` instead of `embed`/`embedMany`, `LocalContent`
  takes a `JWTService`, and `SecretService` is confined to service factories.

## 0.1.2

### Patch Changes

- caa0266: Fix `#pikku` internal package alias to resolve to compiled JS in `dist/.pikku/` instead of the TypeScript source in `.pikku/`. Previously, the `imports` field pointed to `./.pikku/pikku-types.gen.ts`, causing `ERR_MODULE_NOT_FOUND` at runtime in plain Node.js (without tsx) because the re-exported `.gen.js` files only exist in `dist/.pikku/` after compilation.

## 0.1.1

### Patch Changes

- 092e991: Fix .pikku exports to resolve from dist/.pikku instead of root .pikku, preventing module-not-found errors in consumers
- 7a5d17a: Rename `node` config key to `addon` in pikku.config.json

## 0.1.0

Initial release.
