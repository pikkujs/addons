import { VonageService } from './vonage-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('vonage')
    if (!cred?.apiKey) {
      throw new Error('Missing vonage credential')
    }
    const vonage = new VonageService(cred, variables)

    return { vonage }
  }
)
