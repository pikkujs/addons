---
'@pikku/addon-whatsapp': patch
---

Move the Baileys (personal-tier) adapter to a `@pikku/addon-whatsapp/baileys` subpath export. The main entry eagerly re-exported `baileys-gateway-adapter.js`, whose static `@whiskeysockets/baileys` import crashed every app at boot unless the optional peer was installed — business-tier (Cloud API webhook) users must not need Baileys. Import `BaileysGatewayAdapter`/`BaileysAdapterOptions` from `@pikku/addon-whatsapp/baileys` instead.
