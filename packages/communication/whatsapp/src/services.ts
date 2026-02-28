import { WhatsappService } from './whatsapp-api.service.js'
import type { WhatsappSecrets } from './whatsapp.secret.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecretJSON<WhatsappSecrets>('WHATSAPP_CREDENTIALS')
  const whatsapp = new WhatsappService(creds)

  return { whatsapp }
})
