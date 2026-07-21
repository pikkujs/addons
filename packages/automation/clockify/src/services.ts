import { ClockifyService } from './clockify-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('clockify')
    if (!cred?.apiKey) {
      throw new Error('Missing clockify credential')
    }
    const clockify = new ClockifyService(cred, variables)

    return { clockify }
  }
)
