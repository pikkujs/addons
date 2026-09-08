---
'@pikku/addon-commerce-stripe': patch
---

Rename `@pikku/addon-stripe-commerce` to `@pikku/addon-commerce-stripe`, so the
capability leads the name and future providers group beside it.

The package was never published, so nothing depends on the old name and this
costs no migration. The reason to spend the rename now is that a second commerce
provider is expected: `commerce-*` sorts the ready-made storefronts together in
a listing, where `*-commerce` scatters them under whichever vendor each wraps.

The distinction the name now carries is the one that matters at install time.
`@pikku/addon-stripe` is the generated wrapper over Stripe's API — raw
operations, one call at a time. This package is a working storefront: its own
tables, catalogue, cart, checkout, orders, fulfilment, refunds and webhook
settlement, over the Stripe HTTP API with no SDK dependency. An app that wants
people to buy things wants this one.

`displayName` becomes "Stripe Commerce" and the icon follows the package name,
so the catalogue entry reads as commerce rather than as a second payments
integration.
