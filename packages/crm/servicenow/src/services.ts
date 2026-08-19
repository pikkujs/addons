import { ServicenowService } from './servicenow-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('servicenow')
    if (!cred?.apiKey) {
      throw new Error('Missing servicenow credential')
    }
    const servicenow = new ServicenowService(cred, variables)

    return { servicenow }
  }
)
