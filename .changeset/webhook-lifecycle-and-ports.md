---
'@pikku/addon-stripe': minor
'@pikku/addon-commerce-stripe': minor
'@pikku/addon-plentymarkets': minor
'@pikku/addon-shopify': minor
'@pikku/addon-paddle': minor
'@pikku/addon-telegram': minor
'@pikku/addon-pagerduty': minor
'@pikku/addon-sendgrid': minor
'@pikku/addon-mandrill': minor
---

Webhook source lifecycle steps (`check`, `setup`, `teardown`) for Stripe,
Shopify, Paddle, Telegram, PagerDuty, SendGrid and Mandrill, so
`pikku webhooks setup` registers the endpoint and stores the signing secret the
provider issues. Stripe gets `stripeWebhookReceive`; commerce-stripe gets
`receiveStripeWebhook` and `applyStripeWebhookEvent` as the trigger that
applies events to its tables; PlentyMarkets gets `plentymarketsWebhookReceive`.
The HTTP handlers they replace still work and are marked deprecated.
