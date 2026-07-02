# @pikku/addon-resend

## 0.0.4

### Patch Changes

- d09095e: Ship complete catalogue metadata: add the missing icon SVGs the configs already referenced, add icon keys where absent, and move flyio/resend's legacy `node:` meta block to `addon:` so displayName/description/categories/icon actually bake into the published addon meta

## 0.0.3

### Patch Changes

- 6470d18: Merge email adapter into API service class — each provider service now implements `EmailService` directly. The separate `*EmailService` adapter classes are removed.

  Constructor accepts `TypedSecretService | string` (for string-keyed providers) or `TypedSecretService | MailgunSecrets` (Mailgun), so host apps can pass credentials directly or let the service resolve them lazily from the secret store.

- caa0266: Fix `#pikku` internal package alias to resolve to compiled JS in `dist/.pikku/` instead of the TypeScript source in `.pikku/`. Previously, the `imports` field pointed to `./.pikku/pikku-types.gen.ts`, causing `ERR_MODULE_NOT_FOUND` at runtime in plain Node.js (without tsx) because the re-exported `.gen.js` files only exist in `dist/.pikku/` after compilation.

## 0.0.2

### Patch Changes

- e742fc6: Add an `EmailService` adapter to each sending email addon — `SmtpEmailService` (email-send), `SendgridEmailService`, `MailgunEmailService`, `MandrillEmailService`, `GmailEmailService`, and `ResendEmailService`. Each implements the core `@pikku/core` `EmailService` interface and is exported so host apps can wire it as `emailService` (the raw API services and RPC functions are unchanged). Also adds the new `@pikku/addon-resend` package.
