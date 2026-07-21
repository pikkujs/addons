import { KeapService } from './keap-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const keap = new KeapService(secrets, variables)

  return { keap }
})
