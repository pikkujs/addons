---
"@pikku/addon-email-send": patch
"@pikku/addon-sendgrid": patch
"@pikku/addon-mailgun": patch
"@pikku/addon-mandrill": patch
"@pikku/addon-gmail": patch
"@pikku/addon-resend": patch
---

Add an `EmailService` adapter to each sending email addon — `SmtpEmailService` (email-send), `SendgridEmailService`, `MailgunEmailService`, `MandrillEmailService`, `GmailEmailService`, and `ResendEmailService`. Each implements the core `@pikku/core` `EmailService` interface and is exported so host apps can wire it as `emailService` (the raw API services and RPC functions are unchanged). Also adds the new `@pikku/addon-resend` package.
