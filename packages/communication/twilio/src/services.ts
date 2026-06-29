import { TwilioService } from './twilio-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = await secrets.getSecret('TWILIO_CREDENTIALS')
  const twilio = new TwilioService(creds)

  return { twilio }
})
