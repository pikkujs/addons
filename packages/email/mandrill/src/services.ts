import { MandrillService } from './mandrill-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const apiKey = await secrets.getSecret<string>('MANDRILL_API_KEY')
  const mandrill = new MandrillService(apiKey)

  return { mandrill }
})
