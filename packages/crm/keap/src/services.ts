import { UnauthorizedError } from '@pikku/core/errors'
import { KeapService } from './keap-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('keap')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Keap connection — connect Keap first')
    }
    const keap = new KeapService(cred, variables)

    return { keap }
  }
)
