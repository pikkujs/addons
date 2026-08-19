import { WekanService } from './wekan-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('wekan')
    if (!cred?.apiKey) {
      throw new Error('Missing wekan credential')
    }
    const wekan = new WekanService(cred, variables)

    return { wekan }
  }
)
