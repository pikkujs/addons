import { PlentymarketsService } from './plentymarkets-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(
  async (config, { secrets }) => {
    const creds =
      await secrets.getSecret(
        'PLENTYMARKETS_CREDENTIALS'
      )
    const plentymarkets = new PlentymarketsService(creds)

    return { plentymarkets }
  }
)
