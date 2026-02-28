import { TwilioService } from './twilio-api.service.js'
import type { TwilioSecrets } from './twilio.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = await secrets.getSecretJSON<TwilioSecrets>('TWILIO_CREDENTIALS')
  const twilio = new TwilioService(creds)

  return { twilio }
})
