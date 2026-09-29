import { WebhookSigningSecret } from '@pikku/core/hmac'
import { MandrillService } from './mandrill-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets, credentialService }) => {
  const mandrill = new MandrillService(secrets)
  const mandrillWebhookSecret = WebhookSigningSecret.fromCredential(
    'Mandrill',
    credentialService,
    'mandrillWebhookSecret'
  )

  return { mandrill, mandrillWebhookSecret }
})
