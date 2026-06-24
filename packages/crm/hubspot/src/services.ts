import { HubspotService } from './hubspot-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const apiKey = await secrets.getSecret<string>('HUBSPOT_API_KEY')
  const hubspot = new HubspotService(apiKey)

  return { hubspot }
})
