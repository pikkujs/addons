import { ClickupService } from './clickup-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('clickup')
    if (!cred?.apiKey) {
      throw new Error('Missing clickup credential')
    }
    const clickup = new ClickupService(cred, variables)

    return { clickup }
  }
)
