---
'@pikku/addon-whatsapp-baileys': patch
'@pikku/addon-whatsapp': patch
---

Split the Baileys adapter out of `@pikku/addon-whatsapp` into a new
`@pikku/addon-whatsapp-baileys` package.

The two adapters shared no code — they are different products with different
trust models. `@pikku/addon-whatsapp` is Meta's official Business Cloud API
(webhook transport, Business account required), while Baileys is a
reverse-engineered WhatsApp Web client (listener transport, QR pairing) whose
use can get an account banned. Shipping both under one name hid that risk.

- `@pikku/addon-whatsapp` now contains only the Cloud API adapter, service,
  secret and message functions. It no longer depends on
  `@whiskeysockets/baileys` or `qrcode-terminal` — the latter was previously a
  *required* peer dependency that only Baileys used, so every Cloud API
  consumer installed it for nothing.
- `BaileysGatewayAdapter` and `BaileysAdapterOptions` now come from
  `@pikku/addon-whatsapp-baileys`.

**Breaking:** consumers importing `BaileysGatewayAdapter` or
`BaileysAdapterOptions` from `@pikku/addon-whatsapp` must install
`@pikku/addon-whatsapp-baileys` and update the import. Cloud API consumers are
unaffected.
