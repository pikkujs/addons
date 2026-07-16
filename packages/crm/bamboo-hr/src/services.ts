import { BambooHrService } from './bamboo-hr-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('bambooHr')
    if (!cred?.apiKey) {
      throw new Error('Missing bambooHr credential')
    }
    const bambooHr = new BambooHrService(cred, variables)

    return { bambooHr }
  }
)
