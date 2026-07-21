import { LinkedinService } from './linkedin-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const linkedin = new LinkedinService(secrets, variables)

  return { linkedin }
})
