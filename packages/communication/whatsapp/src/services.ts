import { WhatsappService } from './whatsapp-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecret('WHATSAPP_CREDENTIALS')
  const whatsapp = new WhatsappService(creds)

  return { whatsapp }
})
