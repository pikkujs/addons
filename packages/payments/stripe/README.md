# @pikku/addon-stripe

Stripe payments and subscriptions: charges, customers, coupons, sources, tokens,
meter events, subscriptions, checkout, payment intents, and webhook handling.

## Functions

**Balance:** `balanceGet`
**Charges:** `chargeCreate`, `chargeGet`, `chargeList`, `chargeUpdate`
**Coupons:** `couponCreate`, `couponList`
**Customers:** `customerCreate`, `customerGet`, `customerDelete`, `customerUpdate`, `customerList`
**Sources:** `sourceCreate`, `sourceGet`, `sourceDelete`
**Tokens:** `tokenCreate`
**Customer Cards:** `customerCardAdd`, `customerCardGet`, `customerCardRemove`
**Meter Events:** `meterEventCreate`
**Subscriptions:** `subscriptionGet`, `subscriptionUpdate`, `subscriptionCancel`
**Checkout:** `checkoutSessionCreate`, `billingPortalSessionCreate`
**Payment Intents:** `paymentIntentCreate` (off-session top-ups)
**Webhooks:** `stripeWebhookHandler`

## Webhooks

`stripeWebhookHandler` verifies the Stripe signature against the raw request
body (`STRIPE_WEBHOOK_SECRET`) and publishes the verified event onto the
`stripe-webhook-event` queue (exported as `STRIPE_WEBHOOK_QUEUE`). The consuming
app owns the mapping by wiring the route and a queue worker:

```typescript
import { addon } from '#pikku'
import { wireHTTPRoutes } from '#pikku/pikku-types.gen.js'
import { wireQueueWorker } from '#pikku/queue/pikku-queue-types.gen.js'
import { STRIPE_WEBHOOK_QUEUE } from '@pikku/addon-stripe'

wireHTTPRoutes({ routes: { stripe: { webhook: {
  method: 'post', route: '/webhooks/stripe',
  func: addon('stripe:stripeWebhookHandler'), auth: false,
} } } })

wireQueueWorker({ name: STRIPE_WEBHOOK_QUEUE, func: handleStripeEvent })
```

The host app must provide `queueService` (any pikku queue adapter — pg-boss,
BullMQ, …) as a singleton service; the handler enqueues onto it.

## Secrets

- `STRIPE_SECRET_KEY` — Stripe secret key (`sk_...`)
- `STRIPE_WEBHOOK_SECRET` — webhook signing secret (`whsec_...`)

## Dependencies

- stripe
