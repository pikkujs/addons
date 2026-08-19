import { NasaService } from './nasa-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('nasa')
    if (!cred?.apiKey) {
      throw new Error('Missing nasa credential')
    }
    const nasa = new NasaService(cred, variables)

    return { nasa }
  }
)
