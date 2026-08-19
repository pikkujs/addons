import { LemlistService } from './lemlist-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('lemlist')
    if (!cred?.apiKey) {
      throw new Error('Missing lemlist credential')
    }
    const lemlist = new LemlistService(cred, variables)

    return { lemlist }
  }
)
