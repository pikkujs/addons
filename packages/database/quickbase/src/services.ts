import { QuickbaseService } from './quickbase-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('quickbase')
    if (!cred?.apiKey) {
      throw new Error('Missing quickbase credential')
    }
    const quickbase = new QuickbaseService(cred, variables)

    return { quickbase }
  }
)
