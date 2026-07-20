# @pikku/addon-whatsapp-baileys

WhatsApp messaging via the unofficial [Baileys](https://github.com/WhiskeySockets/Baileys) Web client. Authenticate by scanning a QR code with your personal WhatsApp — no Business account needed.

> **Unofficial.** Baileys reverse-engineers the WhatsApp Web protocol. It is not sanctioned by Meta, and using it may result in your WhatsApp account being banned. For the official Business Cloud API, use [`@pikku/addon-whatsapp`](../whatsapp).

## Installation

```bash
npm install @pikku/addon-whatsapp-baileys @whiskeysockets/baileys qrcode-terminal
```

## BaileysGatewayAdapter (listener)

```typescript
import { BaileysGatewayAdapter } from '@pikku/addon-whatsapp-baileys'
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

## Dependencies

- `@whiskeysockets/baileys` — peer dependency
- `qrcode-terminal` — peer dependency (default QR rendering)
