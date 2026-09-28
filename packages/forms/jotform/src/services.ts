import { WebhookSigningSecret } from '@pikku/core/hmac'
import { JotformService } from './jotform-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = (await secrets.getSecret('JOTFORM_CREDENTIALS')).reveal()
  const jotform = new JotformService(creds)

  const jotformWebhookSecret = new WebhookSigningSecret(
    'Jotform',
    await secrets
      .getSecret('JOTFORM_WEBHOOK_TOKEN')
      .then((secret) => secret.reveal())
      .catch(() => null)
  )


  return { jotform, jotformWebhookSecret }
})
