import { AirtableService } from './airtable-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const apiKey = await secrets.getSecretJSON<string>('AIRTABLE_API_KEY')
  const airtable = new AirtableService(apiKey)

  return { airtable }
})
