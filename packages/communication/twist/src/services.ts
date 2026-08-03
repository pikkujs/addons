import { UnauthorizedError } from '@pikku/core/errors'
import { TwistService } from './twist-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('twist')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Twist connection — connect Twist first')
    }
    const twist = new TwistService(cred, variables)

    return { twist }
  }
)
