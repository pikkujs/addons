import { PlentymarketsService } from './plentymarkets-api.service.js'
import type { PlentymarketsSecrets } from './plentymarkets.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(
  async (config, { secrets }) => {
    const creds =
      await secrets.getSecretJSON<PlentymarketsSecrets>(
        'PLENTYMARKETS_CREDENTIALS'
      )
    const plentymarkets = new PlentymarketsService(creds)

    return { plentymarkets }
  }
)
