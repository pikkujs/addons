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
provider issues in the credential store (`teardown` removes it). Stripe's
signing secret moves from the `STRIPE_WEBHOOK_SECRET` secret to the
`stripeWebhookSecret` credential. Stripe gets `stripeWebhookReceive`; commerce-stripe gets
`receiveStripeWebhook` and `applyStripeWebhookEvent` as the trigger that
applies events to its tables; PlentyMarkets gets `plentymarketsWebhookReceive`.

Breaking: the HTTP handlers they replace are removed — `stripeWebhookHandler`
and `STRIPE_WEBHOOK_QUEUE`, `handleStripeWebhook`, and
`plentymarketsWebhookHandler`, `PLENTYMARKETS_WEBHOOK_QUEUE` and
`plentymarketsHTTPRoutes`. Wire the webhook source and triggers instead (see
the READMEs).
