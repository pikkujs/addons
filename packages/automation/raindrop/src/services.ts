import { RaindropService } from './raindrop-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const raindrop = new RaindropService(secrets, variables)

  return { raindrop }
})
