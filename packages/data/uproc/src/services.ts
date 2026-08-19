import { UprocService } from './uproc-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('uproc')
    if (!cred?.apiKey) {
      throw new Error('Missing uproc credential')
    }
    const uproc = new UprocService(cred, variables)

    return { uproc }
  }
)
