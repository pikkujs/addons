import { PostbinService } from './postbin-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('postbin')
    if (!cred?.apiKey) {
      throw new Error('Missing postbin credential')
    }
    const postbin = new PostbinService(cred, variables)

    return { postbin }
  }
)
