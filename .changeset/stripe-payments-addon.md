---
'@pikku/addon-payment-stripe': patch
---

Add `@pikku/addon-payment-stripe`, a self-contained storefront addon: catalogue,
cart, checkout, orders, fulfilment, refunds and subscriptions, with the tables
it needs shipped as addon schema for `pikku db generate`.

It talks to Stripe over the raw v1 HTTP API rather than the `stripe` SDK, so it
adds no runtime dependency — webhook signatures are verified with WebCrypto and
a constant-time compare, and request bodies are form-encoded in-package.

The local catalogue is authoritative and mirrored onto Stripe write-through:
the same call that saves a product pushes it, a price edit creates a
replacement Price (Stripe's are immutable) and archives the old one, and a
failed push leaves a null mirror column that checkout fills in on demand. There
is no reconciler.

Money is an integer in the currency's minor unit with the currency alongside it,
never a float and never assumed to be 1/100.

Fulfilment follows Stripe's guidance rather than the completion event: an order
whose `payment_status` is still `unpaid` lands in `processing` and moves no
stock, so a delayed method (SEPA, ACH, bank transfer) cannot ship goods against
uncleared funds; `async_payment_succeeded` settles it later. Manual capture
authorises at checkout instead, landing in `authorized` until `captureOrder`
takes the money — in full, or for less on a part-shipment. Disputes are recorded
beside payment state rather than rewriting it.

A buyer is a real Stripe Customer, so a repeat purchase reuses one customer and
a guest who later signs in keeps theirs. Who that customer belongs to is the
app's call, not the addon's: `payment_customer` and `payment_cart` record an
`owner_type`/`owner_id` pair resolved by a `paymentOwner` service, defaulting to
the session's user — or its org, with `STRIPE_OWNER_TYPE=organization`, which is
the same choice better-auth models as its `CustomerType`. Both columns are null
for a guest, and matching falls back to email for one.

An owner that comes back carrying a `stripeCustomerId` is adopted rather than
minted, so an app already running the better-auth Stripe plugin — which keeps
its own `stripeCustomerId` on `user`, `organization` and every `subscription`
row — has one Stripe customer across both halves instead of two. Subscriptions
stay in the addon for standalone use, and are hung off the local customer their
Stripe customer id resolves to.

Subscription period ends read `items.data[0].current_period_end` when the
account is on API version 2025-03-31 or later, where Stripe moved the boundary
off the subscription and onto each item.
