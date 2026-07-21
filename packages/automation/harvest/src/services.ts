import { HarvestService } from './harvest-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const harvest = new HarvestService(secrets, variables)

  return { harvest }
})
