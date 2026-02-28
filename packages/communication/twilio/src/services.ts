import { TwilioService } from './twilio-api.service.js'
import type { TwilioSecrets } from './twilio.secret.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (config, { secrets }) => {
  const creds = await secrets.getSecretJSON<TwilioSecrets>('TWILIO_CREDENTIALS')
  const twilio = new TwilioService(creds)

  return { twilio }
})
