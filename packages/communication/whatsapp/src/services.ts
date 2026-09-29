import { WebhookSigningSecret } from '@pikku/core/hmac'
import { WhatsappService } from './whatsapp-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets, credentialService }) => {
  const creds = (await secrets.getSecret('WHATSAPP_CREDENTIALS')).reveal()
  const whatsapp = new WhatsappService(creds)

  const whatsappWebhookSecret = WebhookSigningSecret.fromCredential(
    'WhatsApp',
    credentialService,
    'whatsappWebhookSecret'
  )


  return { whatsapp, whatsappWebhookSecret }
})
