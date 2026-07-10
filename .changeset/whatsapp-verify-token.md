---
'@pikku/addon-whatsapp': patch
---

Add `verifyToken` to the `WHATSAPP_CREDENTIALS` secret schema — the Cloud API webhook GET challenge requires it (`WhatsAppGatewayAdapter` constructor arg), so it belongs in the typed secret alongside accessToken/phoneNumberId.
