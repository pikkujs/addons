import { CircleciService } from './circleci-api.service.js'
import type { CircleciSecrets } from './circleci.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = await secrets.getSecretJSON<CircleciSecrets>('CIRCLECI_CREDENTIALS')
  const circleci = new CircleciService(creds)

  return { circleci }
})
