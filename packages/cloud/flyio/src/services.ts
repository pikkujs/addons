import { FlyioService } from './flyio-api.service.js'
import type { FlyioSecrets } from './flyio.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const creds = await secrets.getSecretJSON<FlyioSecrets>('FLYIO_CREDENTIALS')
  const flyio = new FlyioService(creds, variables)

  return { flyio }
})
