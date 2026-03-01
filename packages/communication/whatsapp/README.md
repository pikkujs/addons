# @pikku/addon-whatsapp

WhatsApp messaging — supports both the official Business Cloud API and the unofficial Baileys Web client.

## Gateway Adapters

### WhatsAppGatewayAdapter (webhook)

For the official WhatsApp Business Cloud API. Requires a Meta Business account.

```typescript
import { WhatsAppGatewayAdapter } from '@pikku/addon-whatsapp'

const adapter = new WhatsAppGatewayAdapter(whatsappService, verifyToken)
wireGateway({ name: 'whatsapp', type: 'webhook', route: '/webhook/whatsapp', adapter, func: handler })
```

### BaileysGatewayAdapter (listener)

For the unofficial Baileys Web client. Authenticate by scanning a QR code with your personal WhatsApp — no Business account needed.

Requires the optional peer dependency `@whiskeysockets/baileys`:

```bash
npm install @whiskeysockets/baileys qrcode-terminal
```

```typescript
import { BaileysGatewayAdapter } from '@pikku/addon-whatsapp'
import { wireGateway, startListenerGateway } from '@pikku/core/gateway'
import { useMultiFileAuthState } from '@whiskeysockets/baileys'

const adapter = new BaileysGatewayAdapter()
wireGateway({ name: 'baileys', type: 'listener', adapter, func: handler })

const handleMessage = await startListenerGateway('baileys', singletonServices)
const { state, saveCreds } = await useMultiFileAuthState('./auth')
const disconnect = await adapter.connect(
  { auth: { state, saveCreds } },
  handleMessage
)
```

By default, the adapter prints the QR code to the terminal via `qrcode-terminal`. To handle the QR yourself, pass an `onQR` callback:

```typescript
const disconnect = await adapter.connect(
  { auth: { state, saveCreds }, onQR: (qr) => { /* custom QR handling */ } },
  handleMessage
)
```

## Functions

- `messageSend` — send a WhatsApp message
- `messageSendTemplate` — send a template message

## Secrets

`WHATSAPP_CREDENTIALS` — fields: accessToken, phoneNumberId (Cloud API only)

## Dependencies

- `@whiskeysockets/baileys` — optional peer dependency (only needed for `BaileysGatewayAdapter`)
