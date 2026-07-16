import { BitwardenService } from './bitwarden-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('bitwarden')
    if (!cred?.apiKey) {
      throw new Error('Missing bitwarden credential')
    }
    const bitwarden = new BitwardenService(cred, variables)

    return { bitwarden }
  }
)
