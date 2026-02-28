import { MandrillService } from './mandrill-api.service.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (config, { secrets }) => {
  const apiKey = await secrets.getSecretJSON<string>('MANDRILL_API_KEY')
  const mandrill = new MandrillService(apiKey)

  return { mandrill }
})
