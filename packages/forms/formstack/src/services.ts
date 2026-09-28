import { WebhookSigningSecret } from '@pikku/core/hmac'
import { FormstackService } from './formstack-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = (await secrets.getSecret('FORMSTACK_CREDENTIALS')).reveal()
  const formstack = new FormstackService(creds)

  const formstackWebhookSecret = new WebhookSigningSecret(
    'Formstack',
    await secrets
      .getSecret('FORMSTACK_WEBHOOK_HANDSHAKE_KEY')
      .then((secret) => secret.reveal())
      .catch(() => null)
  )


  return { formstack, formstackWebhookSecret }
})
