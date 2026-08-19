import { RocketchatService } from './rocketchat-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('rocketchat')
    if (!cred?.apiKey) {
      throw new Error('Missing rocketchat credential')
    }
    const rocketchat = new RocketchatService(cred, variables)

    return { rocketchat }
  }
)
