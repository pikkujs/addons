import { DhlService } from './dhl-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('dhl')
    if (!cred?.apiKey) {
      throw new Error('Missing dhl credential')
    }
    const dhl = new DhlService(cred, variables)

    return { dhl }
  }
)
