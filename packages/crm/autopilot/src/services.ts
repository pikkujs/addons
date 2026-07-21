import { AutopilotService } from './autopilot-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('autopilot')
    if (!cred?.apiKey) {
      throw new Error('Missing autopilot credential')
    }
    const autopilot = new AutopilotService(cred, variables)

    return { autopilot }
  }
)
