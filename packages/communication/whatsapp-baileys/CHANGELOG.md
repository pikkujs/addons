# @pikku/addon-whatsapp-baileys

## 0.1.1

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

- 84fa090: Update to `@pikku/core` 0.12.74 and `@pikku/cli` 0.12.96, and migrate the
  breaking changes that came with them: `wireSecret`/`wireVariable`/`wireCredential`
  are now `defineSecret`/`defineVariable`/`defineCredential`, `OAuth2Client` is gone
  from `@pikku/core/oauth2` (OAuth tokens are owned by the platform credential
  service and resolved per request), `AIEmbeddingService` exposes
  `embedQuery`/`embedDocuments` instead of `embed`/`embedMany`, `LocalContent`
  takes a `JWTService`, and `SecretService` is confined to service factories.
