---
'@pikku/addon-stripe': patch
---

Mark `STRIPE_WEBHOOK_SECRET` optional. An app that never wires `stripeWebhookHandler` has no
webhook to sign, and a required declaration made deploy gates ask for a secret it would never use.
