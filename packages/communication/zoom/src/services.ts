import { ZoomService } from './zoom-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const zoom = new ZoomService(secrets, variables)

  return { zoom }
})
