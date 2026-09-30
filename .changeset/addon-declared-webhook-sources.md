---
'@pikku/addon-airtable': minor
'@pikku/addon-asana': minor
'@pikku/addon-baserow': minor
'@pikku/addon-clickup': minor
'@pikku/addon-clockify': minor
'@pikku/addon-commerce-stripe': minor
'@pikku/addon-convertkit': minor
'@pikku/addon-elevenlabs': minor
'@pikku/addon-formstack': minor
'@pikku/addon-freshdesk': minor
'@pikku/addon-ghost': minor
'@pikku/addon-github': minor
'@pikku/addon-gitlab': minor
'@pikku/addon-google-calendar': minor
'@pikku/addon-google-drive': minor
'@pikku/addon-jira': minor
'@pikku/addon-jotform': minor
'@pikku/addon-linear': minor
'@pikku/addon-mailchimp': minor
'@pikku/addon-mailer-lite': minor
'@pikku/addon-mailgun': minor
'@pikku/addon-mailjet': minor
'@pikku/addon-mandrill': minor
'@pikku/addon-microsoft-one-drive': minor
'@pikku/addon-microsoft-outlook': minor
'@pikku/addon-microsoft-teams': minor
'@pikku/addon-monday-com': minor
'@pikku/addon-nocodb': minor
'@pikku/addon-onfleet': minor
'@pikku/addon-paddle': minor
'@pikku/addon-pagerduty': minor
'@pikku/addon-plentymarkets': minor
'@pikku/addon-quickbooks': minor
'@pikku/addon-resend': minor
'@pikku/addon-sendgrid': minor
'@pikku/addon-sentry': minor
'@pikku/addon-shopify': minor
'@pikku/addon-storyblok': minor
'@pikku/addon-strapi': minor
'@pikku/addon-strava': minor
'@pikku/addon-stripe': minor
'@pikku/addon-survey-monkey': minor
'@pikku/addon-taiga': minor
'@pikku/addon-telegram': minor
'@pikku/addon-trello': minor
'@pikku/addon-twilio': minor
'@pikku/addon-typeform': minor
'@pikku/addon-webflow': minor
'@pikku/addon-wekan': minor
'@pikku/addon-whatsapp': minor
'@pikku/addon-wise': minor
'@pikku/addon-woocommerce': minor
'@pikku/addon-youtube': minor
'@pikku/addon-zammad': minor
'@pikku/addon-zendesk': minor
'@pikku/addon-zoom': minor
---

Each addon with a webhook source now declares it, so an app gets the source by
wiring the addon: no `wireTriggerWebhookSource` in the app. The source is named
and routed after the addon's namespace (`/webhooks/<namespace>`), and stays off
until it is turned on.
