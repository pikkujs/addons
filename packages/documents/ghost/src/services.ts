import { GhostService } from './ghost-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('ghost')
    if (!cred?.apiKey) {
      throw new Error('Missing ghost credential')
    }
    const ghost = new GhostService(cred, variables)

    return { ghost }
  }
)
