import { OnfleetService } from './onfleet-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('onfleet')
    if (!cred?.apiKey) {
      throw new Error('Missing onfleet credential')
    }
    const onfleet = new OnfleetService(cred, variables)

    return { onfleet }
  }
)
