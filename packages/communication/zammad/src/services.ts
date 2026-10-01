import { ZammadService } from './zammad-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ token: string }>('zammad')
    if (!cred?.token) {
      throw new Error('Missing zammad credential')
    }
    const zammad = new ZammadService(cred, variables)

    return { zammad }
  }
)
