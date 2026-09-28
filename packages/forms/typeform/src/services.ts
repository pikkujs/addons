import { WebhookSigningSecret } from '@pikku/core/hmac'
import { TypeformService } from './typeform-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = (await secrets.getSecret('TYPEFORM_CREDENTIALS')).reveal()
  const typeform = new TypeformService(creds)

  const typeformWebhookSecret = new WebhookSigningSecret(
    'Typeform',
    await secrets
      .getSecret('TYPEFORM_WEBHOOK_SECRET')
      .then((secret) => secret.reveal())
      .catch(() => null)
  )


  return { typeform, typeformWebhookSecret }
})
