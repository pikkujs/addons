import { UnauthorizedError } from '@pikku/core/errors'
import { ZoomService } from './zoom-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('zoom')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Zoom connection — connect Zoom first')
    }
    const zoom = new ZoomService(cred, variables)

    return { zoom }
  }
)
