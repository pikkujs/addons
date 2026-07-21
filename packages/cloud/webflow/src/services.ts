import { WebflowService } from './webflow-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ token: string }>('webflow')
    if (!cred?.token) {
      throw new Error('Missing webflow credential')
    }
    const webflow = new WebflowService(cred, variables)

    return { webflow }
  }
)
