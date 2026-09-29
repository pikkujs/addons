import { WebhookSigningSecret } from '@pikku/core/hmac'
import { JotformService } from './jotform-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets, credentialService }) => {
  const creds = (await secrets.getSecret('JOTFORM_CREDENTIALS')).reveal()
  const jotform = new JotformService(creds)

  const jotformWebhookSecret = WebhookSigningSecret.fromCredential(
    'Jotform',
    credentialService,
    'jotformWebhookSecret'
  )


  return { jotform, jotformWebhookSecret }
})
