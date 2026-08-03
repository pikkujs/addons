# @pikku/addon-whatsapp

## 0.1.5

### Patch Changes

- 22d5c6d: Split the Baileys adapter out of `@pikku/addon-whatsapp` into a new
  `@pikku/addon-whatsapp-baileys` package.

  The two adapters shared no code — they are different products with different
  trust models. `@pikku/addon-whatsapp` is Meta's official Business Cloud API
  (webhook transport, Business account required), while Baileys is a
  reverse-engineered WhatsApp Web client (listener transport, QR pairing) whose
  use can get an account banned. Shipping both under one name hid that risk.

  - `@pikku/addon-whatsapp` now contains only the Cloud API adapter, service,
    secret and message functions. It no longer depends on
    `@whiskeysockets/baileys` or `qrcode-terminal` — the latter was previously a
    _required_ peer dependency that only Baileys used, so every Cloud API
    consumer installed it for nothing.
  - `BaileysGatewayAdapter` and `BaileysAdapterOptions` now come from
    `@pikku/addon-whatsapp-baileys`.

  **Breaking:** consumers importing `BaileysGatewayAdapter` or
  `BaileysAdapterOptions` from `@pikku/addon-whatsapp` must install
  `@pikku/addon-whatsapp-baileys` and update the import. Cloud API consumers are
  unaffected.

- 22d5c6d: Verify Meta's `X-Hub-Signature-256` on inbound WhatsApp webhook deliveries.

  `verifyWebhook` previously handled only the GET `hub.challenge` subscription
  handshake — inbound POST message deliveries were parsed with no authentication
  at all, so anyone who knew the webhook URL could POST a payload claiming any
  `from` number. That is an impersonation vector for any application that derives
  identity or authorization from the sender.

  Message deliveries are now authenticated with an HMAC-SHA256 of the raw request
  body keyed by the Meta app secret, mirroring the existing Slack gateway's
  signature check. The check fails closed: no HTTP request access, a missing
  header, or a digest mismatch all reject with `UnauthorizedError`. The digest is
  computed over the raw bytes rather than the re-serialized payload, since key
  order and whitespace would otherwise change it.

  The GET subscription handshake stays exempt — Meta does not sign it, and
  `hub.verify_token` is its shared secret.

  Note that Meta's scheme carries no timestamp, so unlike Slack's it offers no
  replay protection; a captured request remains valid until the app secret is
  rotated.

  **Breaking:** `WhatsAppGatewayAdapter` takes a third constructor argument,
  `appSecret`, and `WHATSAPP_CREDENTIALS` gains a required `appSecret` field
  (Meta App Dashboard → Settings → Basic). Making it required is deliberate — an
  optional secret would let the check silently no-op.

- 84fa090: Update to `@pikku/core` 0.12.74 and `@pikku/cli` 0.12.96, and migrate the
  breaking changes that came with them: `wireSecret`/`wireVariable`/`wireCredential`
  are now `defineSecret`/`defineVariable`/`defineCredential`, `OAuth2Client` is gone
  from `@pikku/core/oauth2` (OAuth tokens are owned by the platform credential
  service and resolved per request), `AIEmbeddingService` exposes
  `embedQuery`/`embedDocuments` instead of `embed`/`embedMany`, `LocalContent`
  takes a `JWTService`, and `SecretService` is confined to service factories.

## 0.1.4

### Patch Changes

- f799ab8: Move the Baileys (personal-tier) adapter to a `@pikku/addon-whatsapp/baileys` subpath export. The main entry eagerly re-exported `baileys-gateway-adapter.js`, whose static `@whiskeysockets/baileys` import crashed every app at boot unless the optional peer was installed — business-tier (Cloud API webhook) users must not need Baileys. Import `BaileysGatewayAdapter`/`BaileysAdapterOptions` from `@pikku/addon-whatsapp/baileys` instead.
- 7b86350: verifyWebhook now accepts pikku's dot-nested query shape. Pikku's `request.query()` parses `hub.mode=subscribe` into `{ hub: { mode } }` (picoquery nesting), while the adapter only read the flat `query['hub.mode']` — so the Meta GET challenge always failed under a pikku HTTP runner. Both shapes are accepted now.

## 0.1.3

### Patch Changes

- 10e9d9e: Add `verifyToken` to the `WHATSAPP_CREDENTIALS` secret schema — the Cloud API webhook GET challenge requires it (`WhatsAppGatewayAdapter` constructor arg), so it belongs in the typed secret alongside accessToken/phoneNumberId.

## 0.1.2

### Patch Changes

- caa0266: Fix `#pikku` internal package alias to resolve to compiled JS in `dist/.pikku/` instead of the TypeScript source in `.pikku/`. Previously, the `imports` field pointed to `./.pikku/pikku-types.gen.ts`, causing `ERR_MODULE_NOT_FOUND` at runtime in plain Node.js (without tsx) because the re-exported `.gen.js` files only exist in `dist/.pikku/` after compilation.

## 0.1.1

### Patch Changes

- 092e991: Fix .pikku exports to resolve from dist/.pikku instead of root .pikku, preventing module-not-found errors in consumers
- 7a5d17a: Rename `node` config key to `addon` in pikku.config.json

## 0.1.0

Initial release.
