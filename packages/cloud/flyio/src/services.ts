import { FlyioService } from './flyio-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const creds = (await secrets.getSecret('FLYIO_CREDENTIALS')).reveal()
  const flyio = new FlyioService(creds, variables)

  return { flyio }
})
