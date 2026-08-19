import { UnauthorizedError } from '@pikku/core/errors'
import { RaindropService } from './raindrop-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('raindrop')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Raindrop connection — connect Raindrop first')
    }
    const raindrop = new RaindropService(cred, variables)

    return { raindrop }
  }
)
