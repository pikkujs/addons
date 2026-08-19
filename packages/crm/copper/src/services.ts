import { CopperService } from './copper-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('copper')
    if (!cred?.apiKey) {
      throw new Error('Missing copper credential')
    }
    const copper = new CopperService(cred, variables)

    return { copper }
  }
)
