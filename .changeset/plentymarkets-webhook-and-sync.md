---
'@pikku/addon-plentymarkets': minor
---

Add webhook ingress and catalog/order resync primitives:

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
