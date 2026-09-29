import { WebhookSigningSecret } from '@pikku/core/hmac'
import { TypeformService } from './typeform-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets, credentialService }) => {
  const creds = (await secrets.getSecret('TYPEFORM_CREDENTIALS')).reveal()
  const typeform = new TypeformService(creds)

  const typeformWebhookSecret = WebhookSigningSecret.fromCredential(
    'Typeform',
    credentialService,
    'typeformWebhookSecret'
  )


  return { typeform, typeformWebhookSecret }
})
