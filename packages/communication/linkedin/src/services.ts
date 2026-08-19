import { UnauthorizedError } from '@pikku/core/errors'
import { LinkedinService } from './linkedin-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('linkedin')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No LinkedIn connection — connect LinkedIn first')
    }
    const linkedin = new LinkedinService(cred, variables)

    return { linkedin }
  }
)
