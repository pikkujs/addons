import { GristService } from './grist-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('grist')
    if (!cred?.apiKey) {
      throw new Error('Missing grist credential')
    }
    const grist = new GristService(cred, variables)

    return { grist }
  }
)
