import { WebhookSigningSecret } from '@pikku/core/hmac'
import { AirtableService } from './airtable-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const apiKey = (await secrets.getSecret('AIRTABLE_API_KEY')).reveal()
  const airtable = new AirtableService(apiKey)

  const airtableWebhookSecret = new WebhookSigningSecret(
    'Airtable',
    await secrets
      .getSecret('AIRTABLE_WEBHOOK_SECRET')
      .then((secret) => secret.reveal())
      .catch(() => null)
  )


  return { airtable, airtableWebhookSecret }
})
