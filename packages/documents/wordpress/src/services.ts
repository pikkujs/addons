import { WordpressService } from './wordpress-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential service unavailable')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('wordpress')
    if (!cred?.apiKey) {
      throw new Error('Missing wordpress credential')
    }
    const wordpress = new WordpressService(cred, variables)

    return { wordpress }
  }
)
