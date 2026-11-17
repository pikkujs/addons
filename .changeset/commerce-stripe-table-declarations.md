---
'@pikku/addon-commerce-stripe': patch
---

The addon declares its ten tables in `db/tables.ts` with `defineTables` from `@pikku/core/db`, and `pikku db export` publishes the declaration. The per-dialect SQL in `db/sqlite` and `db/postgres` and `db/annotations.ts` are gone; an app's `pikku db generate` plans the tables from the declaration. Needs a `@pikku/cli` and `@pikku/core` that read addon declarations.

Breaking: the tables start with `payment_`, so the addon must be wired as `name: 'payment'`; the README wired it as `shop`, which `pikku db generate` now refuses. The webhook route is `/webhooks/payment` and the trigger functions are `payment:*`. SQLite no longer gets the `CHECK` constraints the old SQL wrote on `status`, `capture_method`, `fulfillment_status` and `dispute_status`; Postgres and MySQL do.

`payment_customer_owner_unique` is a plain unique index over `(owner_type, owner_id, stripe_account)`. A unique index treats NULLs as distinct, so a customer with a NULL `stripe_account` (the default account) is no longer unique per owner; the old `COALESCE` index enforced that.
