import { TwistService } from './twist-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const twist = new TwistService(secrets, variables)

  return { twist }
})
