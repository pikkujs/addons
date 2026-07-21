---
'@pikku/addon-stripe': patch
---

Expand `@pikku/addon-stripe` to cover a full payment-taking app, not just
server-to-server operations. Adds:

- **Refunds:** `refundCreate`, `refundGet`, `refundList`.
- **Products & Prices:** `productCreate/Get/List/Update`, `priceCreate/Get/List/Update` — build a catalog in code instead of the dashboard.
- **Payment Intents lifecycle:** `paymentIntentGet`, `paymentIntentConfirm`, `paymentIntentCapture` (auth-then-capture), `paymentIntentCancel`. `paymentIntentCreate` now returns `client_secret` and accepts an optional (rather than required) `payment_method` plus `automatic_payment_methods`/`setup_future_usage`, enabling client-side Stripe Elements / Payment Element flows.
- **Setup Intents:** `setupIntentCreate` (save a card without charging) and `setupIntentGet`.
- **Subscriptions:** `subscriptionCreate` (with `payment_behavior: default_incomplete` for client-side first payment) alongside the existing get/update/cancel.
- **Invoices:** `invoiceCreate/Get/List/Finalize/Send/Void/Pay` and `invoiceItemCreate`.
- **Connect (marketplaces):** `accountCreate`, `accountGet`, `accountLinkCreate`, `transferCreate`, `payoutCreate`.
- **Checkout:** `checkoutSessionCreate` gains inline `price_data` (dynamic amounts without a pre-created price), `payment_intent_data` (so one-off top-up metadata reaches the `payment_intent.succeeded` webhook that credits a wallet), `subscription_data`, `allow_promotion_codes`, and `automatic_tax`; setup-mode sessions no longer send line items.

All additions are 1:1 typed wrappers over the Stripe SDK following the existing
pattern, verified against `stripe-mock` (47 assertions).
