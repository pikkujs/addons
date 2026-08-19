import { MandrillService } from './mandrill-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const mandrill = new MandrillService(secrets)
  return { mandrill }
})
