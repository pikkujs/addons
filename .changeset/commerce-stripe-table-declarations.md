---
'@pikku/addon-commerce-stripe': patch
---

The addon declares its ten tables in `db/tables.ts` with `defineTables` from `@pikku/core/db`, and `pikku db export` publishes the declaration. The per-dialect SQL in `db/sqlite` and `db/postgres` and `db/annotations.ts` are gone; an app's `pikku db generate` plans the tables from the declaration. Needs a `@pikku/cli` and `@pikku/core` that read addon declarations.

Breaking: `stripe_account` on `payment_customer`, `payment_cart` and `payment_order` is `NOT NULL DEFAULT ''`, and `''` is the default account (it was `NULL`). The owner index `payment_customer_owner_unique` is a plain unique index over `(owner_type, owner_id, stripe_account)`, with no `COALESCE`. The row types (`PaymentDatabase`) say `stripeAccount: string`, and the queries compare with `=` and write `''`.

An app that already ran the old SQL gets a refusal from `pikku db generate` and `pikku db check` ("`payment_cart.stripe_account` differs from the migrations: it became NOT NULL") until it writes a migration of its own: set `stripe_account = ''` where it is null, make the column `NOT NULL DEFAULT ''` (SQLite needs a table rebuild), and recreate `payment_customer_owner_unique` over the three columns.

The tables start with `payment_`, so the addon must be wired as `name: 'payment'`; the README wired it as `shop`, which `pikku db generate` now refuses. The webhook route is `/webhooks/payment` and the trigger functions are `payment:*`. SQLite no longer gets the `CHECK` constraints the old SQL wrote on `status`, `capture_method`, `fulfillment_status` and `dispute_status`; Postgres and MySQL do.
