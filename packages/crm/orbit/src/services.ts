import { OrbitService } from './orbit-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ token: string }>('orbit')
    if (!cred?.token) {
      throw new Error('Missing orbit credential')
    }
    const orbit = new OrbitService(cred, variables)

    return { orbit }
  }
)
