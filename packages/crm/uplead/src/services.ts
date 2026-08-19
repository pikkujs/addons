import { UpleadService } from './uplead-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('uplead')
    if (!cred?.apiKey) {
      throw new Error('Missing uplead credential')
    }
    const uplead = new UpleadService(cred, variables)

    return { uplead }
  }
)
