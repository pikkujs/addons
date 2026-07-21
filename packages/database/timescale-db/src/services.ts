import { TimescaleDbService } from './timescale-db-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('timescaleDb')
    if (!cred?.apiKey) {
      throw new Error('Missing timescaleDb credential')
    }
    const timescaleDb = new TimescaleDbService(cred, variables)

    return { timescaleDb }
  }
)
