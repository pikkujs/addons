import { HubspotService } from './hubspot-api.service.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (config, { secrets }) => {
  const apiKey = await secrets.getSecretJSON<string>('HUBSPOT_API_KEY')
  const hubspot = new HubspotService(apiKey)

  return { hubspot }
})
