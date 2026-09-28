import { WebhookSigningSecret } from '@pikku/core/hmac'
import { ResendService } from './resend-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const resend = new ResendService(secrets)
  const resendWebhookSecret = new WebhookSigningSecret(
    'Resend',
    await secrets
      .getSecret('RESEND_WEBHOOK_SECRET')
      .then((secret) => secret.reveal())
      .catch(() => null)
  )

  return { resend, resendWebhookSecret }
})
