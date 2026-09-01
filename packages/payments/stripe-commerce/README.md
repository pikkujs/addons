# @pikku/addon-stripe-commerce

A ready-made Stripe storefront: catalogue, cart, checkout, orders, fulfilment,
refunds and subscriptions, with the tables it needs shipped as addon schema.

Talks to the Stripe v1 HTTP API directly — no `stripe` SDK, no runtime
dependency. Webhook signatures are verified with WebCrypto and a constant-time
compare; request bodies are form-encoded in-package.

## Functions

- `saveProduct`, `listProducts`, `archiveProduct` — the local catalogue, mirrored onto Stripe write-through
- `getCart`, `setCartItem` — a token-addressed cart, priced from the catalogue on every read
- `saveShippingRate`, `listShippingRates`
- `createCheckout`, `createCartCheckout` — hosted Checkout sessions and the pending order the webhook settles
- `listOrders`, `getOrder`, `captureOrder`, `fulfillOrder`, `refundOrder`
- `listSubscriptions`
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

## Secrets and variables

- `STRIPE_SECRET_KEY` — required
- `STRIPE_WEBHOOK_SECRET` — required for the webhook receiver, which refuses every caller without it
- `STRIPE_API_URL`, `STRIPE_API_VERSION` — optional overrides
- `STRIPE_OWNER_TYPE` — `user` (default) or `organization`

## Dependencies

No additional runtime dependencies.
