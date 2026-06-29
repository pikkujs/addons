---
"@pikku/addon-resend": patch
"@pikku/addon-mailgun": patch
"@pikku/addon-sendgrid": patch
"@pikku/addon-mandrill": patch
"@pikku/addon-gmail": patch
---

Merge email adapter into API service class — each provider service now implements `EmailService` directly. The separate `*EmailService` adapter classes are removed.

Constructor accepts `TypedSecretService | string` (for string-keyed providers) or `TypedSecretService | MailgunSecrets` (Mailgun), so host apps can pass credentials directly or let the service resolve them lazily from the secret store.
