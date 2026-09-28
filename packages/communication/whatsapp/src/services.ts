import { WebhookSigningSecret } from '@pikku/core/hmac'
import { WhatsappService } from './whatsapp-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = (await secrets.getSecret('WHATSAPP_CREDENTIALS')).reveal()
  const whatsapp = new WhatsappService(creds)

  const whatsappWebhookSecret = new WebhookSigningSecret(
    'WhatsApp',
    await secrets
      .getSecret('WHATSAPP_APP_SECRET')
      .then((secret) => secret.reveal())
      .catch(() => null)
  )


  return { whatsapp, whatsappWebhookSecret }
})
