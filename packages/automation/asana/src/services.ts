import { AsanaService } from './asana-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ token: string }>('asana')
    if (!cred?.token) {
      throw new Error('Missing asana credential')
    }
    const asana = new AsanaService(cred, variables)

    return { asana }
  }
)
