import { WebhookSigningSecret } from '@pikku/core/hmac'
import { ResendService } from './resend-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets, credentialService }) => {
  const resend = new ResendService(secrets)
  const resendWebhookSecret = WebhookSigningSecret.fromCredential(
    'Resend',
    credentialService,
    'resendWebhookSecret'
  )

  return { resend, resendWebhookSecret }
})
