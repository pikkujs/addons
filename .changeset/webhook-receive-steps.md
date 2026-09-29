---
'@pikku/addon-elevenlabs': minor
'@pikku/addon-asana': minor
'@pikku/addon-clickup': minor
'@pikku/addon-clockify': minor
'@pikku/addon-monday-com': minor
'@pikku/addon-onfleet': minor
'@pikku/addon-taiga': minor
'@pikku/addon-trello': minor
'@pikku/addon-wekan': minor
'@pikku/addon-microsoft-one-drive': minor
'@pikku/addon-webflow': minor
'@pikku/addon-microsoft-teams': minor
'@pikku/addon-telegram': minor
'@pikku/addon-twilio': minor
'@pikku/addon-whatsapp': minor
'@pikku/addon-zammad': minor
'@pikku/addon-zendesk': minor
'@pikku/addon-zoom': minor
'@pikku/addon-freshdesk': minor
'@pikku/addon-google-calendar': minor
'@pikku/addon-google-drive': minor
'@pikku/addon-strava': minor
'@pikku/addon-airtable': minor
'@pikku/addon-baserow': minor
'@pikku/addon-nocodb': minor
'@pikku/addon-github': minor
'@pikku/addon-gitlab': minor
'@pikku/addon-jira': minor
'@pikku/addon-linear': minor
'@pikku/addon-ghost': minor
'@pikku/addon-storyblok': minor
'@pikku/addon-strapi': minor
'@pikku/addon-shopify': minor
'@pikku/addon-woocommerce': minor
'@pikku/addon-convertkit': minor
'@pikku/addon-mailer-lite': minor
'@pikku/addon-mailgun': minor
'@pikku/addon-mailjet': minor
'@pikku/addon-mandrill': minor
'@pikku/addon-microsoft-outlook': minor
'@pikku/addon-resend': minor
'@pikku/addon-sendgrid': minor
'@pikku/addon-formstack': minor
'@pikku/addon-jotform': minor
'@pikku/addon-survey-monkey': minor
'@pikku/addon-typeform': minor
'@pikku/addon-youtube': minor
'@pikku/addon-pagerduty': minor
'@pikku/addon-sentry': minor
'@pikku/addon-paddle': minor
'@pikku/addon-quickbooks': minor
'@pikku/addon-wise': minor
'@pikku/addon-mailchimp': minor
---

Add a webhook `receive` step to 53 addons, for `wireTriggerWebhookSource`.
Each one verifies the provider's signature (or its shared token) with a
`WebhookSigningSecret` built from a new `<PROVIDER>_WEBHOOK_*` secret, answers
the provider's URL handshake where it has one (Zoom, WhatsApp, Strava,
Microsoft Graph, YouTube, Onfleet, Asana, monday.com, Trello), and returns
events named after the provider's own event names.
