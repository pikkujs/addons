import { BitlyService } from './bitly-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('bitly')
    if (!cred?.apiKey) {
      throw new Error('Missing bitly credential')
    }
    const bitly = new BitlyService(cred, variables)

    return { bitly }
  }
)
