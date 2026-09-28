import { WebhookSigningSecret } from '@pikku/core/hmac'
import { TwilioService } from './twilio-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = (await secrets.getSecret('TWILIO_CREDENTIALS')).reveal()
  const twilio = new TwilioService(creds)

  const twilioWebhookSecret = new WebhookSigningSecret(
    'Twilio',
    await secrets
      .getSecret('TWILIO_WEBHOOK_AUTH_TOKEN')
      .then((secret) => secret.reveal())
      .catch(() => null)
  )


  return { twilio, twilioWebhookSecret }
})
