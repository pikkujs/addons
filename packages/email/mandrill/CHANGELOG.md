# @pikku/addon-mandrill

## 0.1.5

### Patch Changes

- 31b0085: Resolve every entry point under `dist`

  `imports["#pikku"]` named `./.pikku/pikku-types.gen.ts` — a TypeScript file, at
  runtime, inside `node_modules` — and `files` published a second copy of
  `.pikku` at the package root whose generated output imported a `../src/` and
  `../types/` the tarball did not contain. The `pikku-bootstrap.gen.js` consumers
  import through the `./.pikku/*` subpath only ever existed under `dist`.
  Everything resolved through the workspace link and none of it resolved on
  install.

  Every entry point now points at the built copy, and `files` is just
  `["dist"]`. The addon's own build resolves `#pikku` through tsconfig
  `paths`, so nothing has to reach into the source tree. Consumer import
  specifiers are unchanged.

- f74a5d6: Ship `types/application-types.d.ts` in the published package.

  The build copied `.pikku` into `dist` but left `types` behind, and TypeScript
  never emits a hand-written `.d.ts` to outDir — so `dist/types` did not exist.
  Every generated file under `dist/.pikku` imports `SingletonServices`, `Services`,
  `Config` and `UserSession` from `../../types/application-types.d.js`, which left
  consumers typechecking against a module that was not there: 14 errors inside
  `node_modules` for an app that merely depends on the addon.

- 0c11caf: Reveal the vault secret before handing it to the upstream SDK

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

## 0.1.4

### Patch Changes

- 84fa090: Update to `@pikku/core` 0.12.74 and `@pikku/cli` 0.12.96, and migrate the
  breaking changes that came with them: `wireSecret`/`wireVariable`/`wireCredential`
  are now `defineSecret`/`defineVariable`/`defineCredential`, `OAuth2Client` is gone
  from `@pikku/core/oauth2` (OAuth tokens are owned by the platform credential
  service and resolved per request), `AIEmbeddingService` exposes
  `embedQuery`/`embedDocuments` instead of `embed`/`embedMany`, `LocalContent`
  takes a `JWTService`, and `SecretService` is confined to service factories.

## 0.1.3

### Patch Changes

- 6470d18: Merge email adapter into API service class — each provider service now implements `EmailService` directly. The separate `*EmailService` adapter classes are removed.

  Constructor accepts `TypedSecretService | string` (for string-keyed providers) or `TypedSecretService | MailgunSecrets` (Mailgun), so host apps can pass credentials directly or let the service resolve them lazily from the secret store.

- caa0266: Fix `#pikku` internal package alias to resolve to compiled JS in `dist/.pikku/` instead of the TypeScript source in `.pikku/`. Previously, the `imports` field pointed to `./.pikku/pikku-types.gen.ts`, causing `ERR_MODULE_NOT_FOUND` at runtime in plain Node.js (without tsx) because the re-exported `.gen.js` files only exist in `dist/.pikku/` after compilation.

## 0.1.2

### Patch Changes

- e742fc6: Add an `EmailService` adapter to each sending email addon — `SmtpEmailService` (email-send), `SendgridEmailService`, `MailgunEmailService`, `MandrillEmailService`, `GmailEmailService`, and `ResendEmailService`. Each implements the core `@pikku/core` `EmailService` interface and is exported so host apps can wire it as `emailService` (the raw API services and RPC functions are unchanged). Also adds the new `@pikku/addon-resend` package.

## 0.1.1

### Patch Changes

- 092e991: Fix .pikku exports to resolve from dist/.pikku instead of root .pikku, preventing module-not-found errors in consumers
- 7a5d17a: Rename `node` config key to `addon` in pikku.config.json

## 0.1.0

Initial release.
