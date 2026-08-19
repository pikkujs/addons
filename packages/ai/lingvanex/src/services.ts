import { LingvanexService } from './lingvanex-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ token: string }>('lingvanex')
    if (!cred?.token) {
      throw new Error('Missing lingvanex credential')
    }
    const lingvanex = new LingvanexService(cred, variables)

    return { lingvanex }
  }
)
