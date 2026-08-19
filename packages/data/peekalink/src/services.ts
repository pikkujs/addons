import { PeekalinkService } from './peekalink-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('peekalink')
    if (!cred?.apiKey) {
      throw new Error('Missing peekalink credential')
    }
    const peekalink = new PeekalinkService(cred, variables)

    return { peekalink }
  }
)
