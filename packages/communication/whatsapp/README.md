# @pikku/addon-whatsapp

WhatsApp messaging via the official [WhatsApp Business Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api). Requires a Meta Business account.

> Looking for QR-code pairing with a personal account? That moved to [`@pikku/addon-whatsapp-baileys`](../whatsapp-baileys).

## Gateway Adapter

### WhatsAppGatewayAdapter (webhook)

```typescript
import { WhatsAppGatewayAdapter } from '@pikku/addon-whatsapp'

const adapter = new WhatsAppGatewayAdapter(whatsappService, verifyToken, appSecret)
wireGateway({ name: 'whatsapp', type: 'webhook', route: '/webhook/whatsapp', adapter, func: handler })
```

### Webhook signature verification

Every inbound message delivery is authenticated against Meta's
`X-Hub-Signature-256` header — an HMAC-SHA256 of the raw request body keyed by
your app secret. The check fails closed: a missing header, a bad signature, or
no HTTP request access all reject the request with `UnauthorizedError`. Without
it, anyone who knows your webhook URL could POST a payload claiming any sender.

The app secret comes from the Meta App Dashboard under **Settings → Basic**, and
is supplied via the `appSecret` field of `WHATSAPP_CREDENTIALS`.

The GET subscription handshake is exempt — Meta does not sign it, and
`hub.verify_token` acts as its shared secret.

Note that Meta's signature scheme carries no timestamp, so it provides no replay
protection; a captured request stays valid until the app secret is rotated.

## Functions

- `messageSend` — send a WhatsApp message
- `messageSendTemplate` — send a template message

## Secrets

`WHATSAPP_CREDENTIALS` — fields: accessToken, phoneNumberId, verifyToken, appSecret. `verifyToken` is any string you choose; enter the same value in the Meta app dashboard webhook config — the adapter echoes the GET challenge only when it matches. `appSecret` is the Meta app secret, used to verify `X-Hub-Signature-256` on incoming webhooks.

## Baileys

The unofficial Baileys (WhatsApp Web) adapter lives in its own package, `@pikku/addon-whatsapp-baileys`, so this package stays free of the `@whiskeysockets/baileys` dependency.
