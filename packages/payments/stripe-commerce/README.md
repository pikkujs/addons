# @pikku/addon-stripe-commerce

A ready-made Stripe storefront: catalogue, cart, checkout, orders, fulfilment
and refunds, with the tables it needs shipped as addon schema.

Commerce only — one-off purchases. Subscriptions, plans, seats and licensing
belong to whatever owns access in your app; better-auth's Stripe plugin already
does that job properly, and this addon does not compete with it. What the two
share is the Stripe Customer, which is the whole integration.

Talks to the Stripe v1 HTTP API directly — no `stripe` SDK, no runtime
dependency. Webhook signatures are verified with WebCrypto and a constant-time
compare; request bodies are form-encoded in-package.

## Functions

- `saveProduct`, `listProducts`, `archiveProduct` — the local catalogue, mirrored onto Stripe write-through
- `getCart`, `setCartItem` — a token-addressed cart, priced from the catalogue on every read
- `saveShippingRate`, `listShippingRates`
- `createCheckout`, `createCartCheckout` — hosted Checkout sessions and the pending order the webhook settles
- `listOrders`, `getOrder`, `captureOrder`, `fulfillOrder`, `refundOrder`
- `handleStripeWebhook`

## Wiring

```ts
wireAddon({ name: 'shop', package: '@pikku/addon-stripe-commerce' })

wireHTTP({
  method: 'post',
  route: '/webhooks/stripe',
  func: addon('shop:handleStripeWebhook'),
  auth: false,
})
```

## Who a purchase belongs to

Stripe has exactly one Customer per billing entity, and the app — not the addon
— knows what a billing entity is. So `payment_customer` records an
`owner_type` / `owner_id` pair rather than a user id, and the pair comes from a
`paymentOwner` service:

```ts
export interface PaymentOwner {
  resolve(session?: CoreUserSession): Promise<{
    type: string
    id: string
    email?: string | null
    stripeCustomerId?: string | null
  } | null>
}
```

The default is `BetterAuthPaymentOwner`: the owner is the session's `userId`, or
its `orgId` when `STRIPE_OWNER_TYPE` is `organization` — the same choice
better-auth models as its `CustomerType` — and the Stripe customer is read off
better-auth's own `user` / `organization` row.

That last part is the whole integration. better-auth's Stripe plugin owns
subscription lifecycle and keeps a `stripeCustomerId` on `user`, `organization`
and every `subscription` row; returning it here makes the storefront **adopt**
that customer instead of posting to `/customers`, so an app's plan subscription
and its orders sit on one Stripe Customer rather than two. Nothing is imported
from better-auth — the tables are in the same database, and the id is the only
fact the addon needs, so any other billing plugin is a resolver away too.

An app running no better-auth Stripe plugin needs no configuration: the lookup
is probed once and a missing table turns it off, leaving the plain session
resolver (`SessionPaymentOwner`, exported for anyone who wants to skip the
probe). Both owner columns are null for a guest, and a guest who later signs in
keeps the Stripe customer they already have.

An app whose billing entity is neither the session user nor its org replaces the
service outright, from its own `pikkuServices` factory.

A guest is claimed on email alone, so `ensureCustomer` will only match a guest
row on an address the caller did not choose — the one the owner record carries.
The reads are scoped the same way: with a session, `getOrder`, `listOrders` and
`listSubscriptions` return only what the resolved owner owns, and the explicit
`ownerId` filter is there for a back office wired without one.

## Webhooks

Stripe delivers to every registered endpoint on the account independently, so
this receiver and better-auth's each get their own copy of everything they are
subscribed to, in any order, with no coordination between them.

It acts on eight event types:

```
checkout.session.completed        payment_intent.payment_failed
checkout.session.async_payment_succeeded    charge.refunded
checkout.session.async_payment_failed       charge.dispute.created
checkout.session.expired                    charge.dispute.closed
```

Narrow the endpoint's event selection in Stripe to that list and nothing else
arrives. Anything that does arrive anyway — `customer.subscription.*` above all
— is logged, answered 200 and dropped without a `payment_webhook_event` row:
that row exists to make a retry a no-op, and there is nothing to repeat for an
event this addon never applied. The 200 matters, because an endpoint that
answers anything else gets retried and eventually disabled by Stripe, which
would take the order events down with it.

## Refunds

`refundOrder` writes a `payment_refund` row keyed by Stripe's own refund id and
only moves the order's running total when that insert is new, so a replayed
idempotency key and two operators refunding at once both land once. The total
itself moves by a delta the database applies rather than by a figure read before
the Stripe call.

## Secrets and variables

- `STRIPE_SECRET_KEY` — required
- `STRIPE_WEBHOOK_SECRET` — required for the webhook receiver, which refuses every caller without it
- `STRIPE_API_URL`, `STRIPE_API_VERSION` — optional overrides
- `STRIPE_OWNER_TYPE` — `user` (default) or `organization`

## Dependencies

No additional runtime dependencies.
