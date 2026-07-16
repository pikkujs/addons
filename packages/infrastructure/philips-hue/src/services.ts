import { PhilipsHueService } from './philips-hue-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('philipsHue')
    if (!cred?.apiKey) {
      throw new Error('Missing philipsHue credential')
    }
    const philipsHue = new PhilipsHueService(cred, variables)

    return { philipsHue }
  }
)
