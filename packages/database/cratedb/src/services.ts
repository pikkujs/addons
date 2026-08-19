import { CratedbService } from './cratedb-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('cratedb')
    if (!cred?.apiKey) {
      throw new Error('Missing cratedb credential')
    }
    const cratedb = new CratedbService(cred, variables)

    return { cratedb }
  }
)
