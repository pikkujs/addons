import { TotpService } from './totp-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('totp')
    if (!cred?.apiKey) {
      throw new Error('Missing totp credential')
    }
    const totp = new TotpService(cred, variables)

    return { totp }
  }
)
