import { EgoiService } from './egoi-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('egoi')
    if (!cred?.apiKey) {
      throw new Error('Missing egoi credential')
    }
    const egoi = new EgoiService(cred, variables)

    return { egoi }
  }
)
