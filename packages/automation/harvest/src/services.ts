import { UnauthorizedError } from '@pikku/core/errors'
import { HarvestService } from './harvest-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('harvest')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Harvest connection — connect Harvest first')
    }
    const harvest = new HarvestService(cred, variables)

    return { harvest }
  }
)
