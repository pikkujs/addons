import { Signl4Service } from './signl4-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('signl4')
    if (!cred?.apiKey) {
      throw new Error('Missing signl4 credential')
    }
    const signl4 = new Signl4Service(cred, variables)

    return { signl4 }
  }
)
