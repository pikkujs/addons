import { WebhookSigningSecret } from '@pikku/core/hmac'
import { FormstackService } from './formstack-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets, credentialService }) => {
  const creds = (await secrets.getSecret('FORMSTACK_CREDENTIALS')).reveal()
  const formstack = new FormstackService(creds)

  const formstackWebhookSecret = WebhookSigningSecret.fromCredential(
    'Formstack',
    credentialService,
    'formstackWebhookSecret'
  )


  return { formstack, formstackWebhookSecret }
})
