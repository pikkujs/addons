# @pikku/addon-whatsapp

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
