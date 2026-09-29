import { WebhookSigningSecret } from '@pikku/core/hmac'
import { TwilioService } from './twilio-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets, credentialService }) => {
  const creds = (await secrets.getSecret('TWILIO_CREDENTIALS')).reveal()
  const twilio = new TwilioService(creds)

  const twilioWebhookSecret = WebhookSigningSecret.fromCredential(
    'Twilio',
    credentialService,
    'twilioWebhookSecret'
  )


  return { twilio, twilioWebhookSecret }
})
