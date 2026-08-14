---
'@pikku/addon-assemblyai': patch
'@pikku/addon-deepl': patch
'@pikku/addon-elevenlabs': patch
'@pikku/addon-openai': patch
'@pikku/addon-google-analytics': patch
'@pikku/addon-meta-conversions': patch
'@pikku/addon-metabase': patch
'@pikku/addon-posthog': patch
'@pikku/addon-segment': patch
'@pikku/addon-zapier': patch
'@pikku/addon-redis': patch
'@pikku/addon-flyio': patch
'@pikku/addon-s3': patch
'@pikku/addon-discord': patch
'@pikku/addon-telegram': patch
'@pikku/addon-twilio': patch
'@pikku/addon-whatsapp': patch
'@pikku/addon-hubspot': patch
'@pikku/addon-airtable': patch
'@pikku/addon-mongodb': patch
'@pikku/addon-mysql': patch
'@pikku/addon-pinecone': patch
'@pikku/addon-postgres': patch
'@pikku/addon-qdrant': patch
'@pikku/addon-supabase': patch
'@pikku/addon-jenkins': patch
'@pikku/addon-docraptor': patch
'@pikku/addon-plentymarkets': patch
'@pikku/addon-shopify': patch
'@pikku/addon-email-send': patch
'@pikku/addon-imap': patch
'@pikku/addon-mailgun': patch
'@pikku/addon-mandrill': patch
'@pikku/addon-resend': patch
'@pikku/addon-sendgrid': patch
'@pikku/addon-formstack': patch
'@pikku/addon-jotform': patch
'@pikku/addon-survey-monkey': patch
'@pikku/addon-typeform': patch
'@pikku/addon-cloudflare': patch
'@pikku/addon-kafka': patch
'@pikku/addon-ldap': patch
'@pikku/addon-ssh': patch
'@pikku/addon-grafana': patch
'@pikku/addon-pagerduty': patch
'@pikku/addon-sentry': patch
'@pikku/addon-uptimerobot': patch
'@pikku/addon-paddle': patch
---

Reveal the vault secret before handing it to the upstream SDK

`@pikku/core` changed `SecretService.getSecret` from `Promise<T>` to
`Promise<SecretValue<T>>` in 0.12.77. Every addon still passed the wrapper
straight into its client, so the secret never reached the wire: a scalar key
threw `SecretCoercionError` on the first request, where the SDK builds an
`Authorization` header, and a `*_CREDENTIALS` object silently read every field
as `undefined` instead. Both failed far from the cause — the stack pointed at
the vendor SDK, not at the secret.

Each addon now calls `.reveal()` at the boundary where the value is handed to
its client, and the peer range starts at the release that introduced
`SecretValue` so the two contracts can no longer both satisfy it.
