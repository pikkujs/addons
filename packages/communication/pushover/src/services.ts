import { PushoverService } from './pushover-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('pushover')
    if (!cred?.apiKey) {
      throw new Error('Missing pushover credential')
    }
    const pushover = new PushoverService(cred, variables)

    return { pushover }
  }
)
