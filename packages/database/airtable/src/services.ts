import { WebhookSigningSecret } from '@pikku/core/hmac'
import { AirtableService } from './airtable-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets, credentialService }) => {
  const apiKey = (await secrets.getSecret('AIRTABLE_API_KEY')).reveal()
  const airtable = new AirtableService(apiKey)

  const airtableWebhookSecret = WebhookSigningSecret.fromCredential(
    'Airtable',
    credentialService,
    'airtableWebhookSecret'
  )


  return { airtable, airtableWebhookSecret }
})
