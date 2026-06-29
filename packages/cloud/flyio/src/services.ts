import { FlyioService } from './flyio-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const creds = await secrets.getSecret('FLYIO_CREDENTIALS')
  const flyio = new FlyioService(creds, variables)

  return { flyio }
})
