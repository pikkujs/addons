import { WhatsappService } from './whatsapp-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = (await secrets.getSecret('WHATSAPP_CREDENTIALS')).reveal()
  const whatsapp = new WhatsappService(creds)

  return { whatsapp }
})
