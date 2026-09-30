# @pikku/addon-stripe

Stripe payments and subscriptions: charges, refunds, customers, products, prices,
coupons, sources, tokens, cards, meter events, subscriptions, invoices, checkout,
payment intents, setup intents, Connect (marketplaces), and webhook handling.

## Functions

**Balance:** `balanceGet`
**Charges:** `chargeCreate`, `chargeGet`, `chargeList`, `chargeUpdate`
**Refunds:** `refundCreate`, `refundGet`, `refundList`
**Coupons:** `couponCreate`, `couponList`
**Customers:** `customerCreate`, `customerGet`, `customerDelete`, `customerUpdate`, `customerList`
**Products:** `productCreate`, `productGet`, `productList`, `productUpdate`
**Prices:** `priceCreate`, `priceGet`, `priceList`, `priceUpdate`
**Sources:** `sourceCreate`, `sourceGet`, `sourceDelete`
**Tokens:** `tokenCreate`
**Customer Cards:** `customerCardAdd`, `customerCardGet`, `customerCardRemove`
**Meter Events:** `meterEventCreate`
**Subscriptions:** `subscriptionCreate`, `subscriptionGet`, `subscriptionUpdate`, `subscriptionCancel`
**Invoices:** `invoiceCreate`, `invoiceGet`, `invoiceList`, `invoiceFinalize`, `invoiceSend`, `invoiceVoid`, `invoicePay`, `invoiceItemCreate`
**Checkout:** `checkoutSessionCreate` (existing `priceId`, or inline `priceData` + `paymentIntentData`/`subscriptionData`), `billingPortalSessionCreate`
**Payment Intents:** `paymentIntentCreate` (off-session charge or client-side Elements — returns `clientSecret`), `paymentIntentGet`, `paymentIntentConfirm`, `paymentIntentCapture`, `paymentIntentCancel`
**Setup Intents:** `setupIntentCreate` (save a card without charging), `setupIntentGet`
**Connect:** `accountCreate`, `accountGet`, `accountLinkCreate`, `transferCreate`, `payoutCreate`
**Webhooks:** `stripeWebhookReceive`, `stripeWebhookCheck`, `stripeWebhookSetup`, `stripeWebhookTeardown`

## Webhooks

The addon declares a Stripe webhook source. `receive` verifies the signature
against the raw body and names each event after its Stripe type; `setup`
creates the endpoint for this deployment and stores its signing secret in the
credential store (`stripeWebhookSecret`), which `teardown` removes.

Wiring the addon mounts the source at `/webhooks/<namespace>`, named after the
addon's namespace. It stays off until it is turned on
(`admin:triggerSourceEnable`, or the console); only then is it registered with
Stripe. The app wires a trigger per event it wants:

```typescript
wireAddon({ name: 'stripe', package: '@pikku/addon-stripe' })

wireTrigger({ name: 'stripe:invoice.paid', func: onInvoicePaid })
```

## Conventions

All function input/output fields are camelCase (e.g. `unitAmount`, `clientSecret`,
`hasMore`), regardless of the underlying Stripe API's snake_case field names.
Timestamp fields (`created`, `currentPeriodEnd`, `arrivalDate`, etc.) are ISO-8601
datetime strings, not raw Unix epoch seconds. The one exception is `metadata`:
both its key names and its string values are passed through untouched in both
directions, since a webhook consumer outside this addon reads metadata keys by
exact match on the Stripe side. Money amounts stay integer minor units (cents),
unconverted — only field names and dates are normalized.

## Secrets

- `STRIPE_SECRET_KEY` — Stripe secret key (`sk_...`)

## Dependencies

- stripe
