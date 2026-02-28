import { CircleciService } from './circleci-api.service.js'
import type { CircleciSecrets } from './circleci.secret.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (config, { secrets }) => {
  const creds = await secrets.getSecretJSON<CircleciSecrets>('CIRCLECI_CREDENTIALS')
  const circleci = new CircleciService(creds)

  return { circleci }
})
