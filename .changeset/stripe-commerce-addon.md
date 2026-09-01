---
'@pikku/addon-stripe-commerce': patch
---

Add `@pikku/addon-stripe-commerce`, a self-contained storefront addon: catalogue,
cart, checkout, orders, fulfilment and refunds, with the tables it needs shipped
as addon schema for `pikku db generate`.

Commerce only, one-off purchases. Subscriptions, plans, seats and licensing are
deliberately out of scope: better-auth's Stripe plugin already owns access, and
a second half-implementation of the same thing is worse than none. What the two
share is the Stripe Customer.

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
minted, and the default resolver reads exactly that off better-auth's own `user`
/ `organization` row: an app running the better-auth Stripe plugin — which keeps
a `stripeCustomerId` there and on every `subscription` row — has one Stripe
customer across both halves instead of two, with nothing to wire and nothing
imported from better-auth. An app without the plugin probes once and falls back
to the plain session resolver.

The webhook receiver acts on eight event types: the four `checkout.session.*`,
`payment_intent.payment_failed`, `charge.refunded` and the two
`charge.dispute.*`. Stripe fans every event out to every registered endpoint
independently, so this receiver and an auth layer's own each get their own copy
with no coordination between them. Anything outside the eight —
`customer.subscription.*` above all — is logged, answered 200 and dropped
without an event row, because that row exists to make a retry a no-op and there
is nothing to repeat for an event the addon never applied. The 200 is not
optional: an endpoint that answers anything else is retried and eventually
disabled by Stripe, which would take the order events with it.

Reads are scoped to the buyer: with a session, `getOrder` and `listOrders`
return only what the resolved owner owns, and the explicit `ownerId` filter is
for a back office wired without one. A guest customer is
only claimed on an email the owner record carries, never one the caller typed.

Refunds are recorded in `payment_refund` keyed by Stripe's own refund id, and
the order total moves by a delta the database applies, so a replayed
idempotency key or two operators refunding at once cannot double-count or lose
a refund. A webhook that fails to apply releases its event row so Stripe's
retry is not swallowed as a duplicate.
