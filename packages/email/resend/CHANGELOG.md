# @pikku/addon-resend

## 0.0.2

### Patch Changes

- e742fc6: Add an `EmailService` adapter to each sending email addon — `SmtpEmailService` (email-send), `SendgridEmailService`, `MailgunEmailService`, `MandrillEmailService`, `GmailEmailService`, and `ResendEmailService`. Each implements the core `@pikku/core` `EmailService` interface and is exported so host apps can wire it as `emailService` (the raw API services and RPC functions are unchanged). Also adds the new `@pikku/addon-resend` package.
