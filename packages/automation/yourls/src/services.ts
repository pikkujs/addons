import { YourlsService } from './yourls-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('yourls')
    if (!cred?.apiKey) {
      throw new Error('Missing yourls credential')
    }
    const yourls = new YourlsService(cred, variables)

    return { yourls }
  }
)
