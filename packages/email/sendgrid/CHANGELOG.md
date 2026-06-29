# @pikku/addon-sendgrid

## 0.1.2

### Patch Changes

- e742fc6: Add an `EmailService` adapter to each sending email addon — `SmtpEmailService` (email-send), `SendgridEmailService`, `MailgunEmailService`, `MandrillEmailService`, `GmailEmailService`, and `ResendEmailService`. Each implements the core `@pikku/core` `EmailService` interface and is exported so host apps can wire it as `emailService` (the raw API services and RPC functions are unchanged). Also adds the new `@pikku/addon-resend` package.

## 0.1.1

### Patch Changes

- 092e991: Fix .pikku exports to resolve from dist/.pikku instead of root .pikku, preventing module-not-found errors in consumers
- 7a5d17a: Rename `node` config key to `addon` in pikku.config.json

## 0.1.0

Initial release.
