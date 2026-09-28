import { WebhookSigningSecret } from '@pikku/core/hmac'
import { MandrillService } from './mandrill-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const mandrill = new MandrillService(secrets)
  const mandrillWebhookSecret = new WebhookSigningSecret(
    'Mandrill',
    await secrets
      .getSecret('MANDRILL_WEBHOOK_KEY')
      .then((secret) => secret.reveal())
      .catch(() => null)
  )

  return { mandrill, mandrillWebhookSecret }
})
