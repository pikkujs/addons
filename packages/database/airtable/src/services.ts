import { AirtableService } from './airtable-api.service.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (config, { secrets }) => {
  const apiKey = await secrets.getSecretJSON<string>('AIRTABLE_API_KEY')
  const airtable = new AirtableService(apiKey)

  return { airtable }
})
