import { CortexService } from './cortex-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ token: string }>('cortex')
    if (!cred?.token) {
      throw new Error('Missing cortex credential')
    }
    const cortex = new CortexService(cred, variables)

    return { cortex }
  }
)
