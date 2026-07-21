import { ClearbitService } from './clearbit-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ token: string }>('clearbit')
    if (!cred?.token) {
      throw new Error('Missing clearbit credential')
    }
    const clearbit = new ClearbitService(cred, variables)

    return { clearbit }
  }
)
