import { HunterService } from './hunter-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('hunter')
    if (!cred?.apiKey) {
      throw new Error('Missing hunter credential')
    }
    const hunter = new HunterService(cred, variables)

    return { hunter }
  }
)
