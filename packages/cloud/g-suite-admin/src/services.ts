import { UnauthorizedError } from '@pikku/core/errors'
import { GSuiteAdminService } from './g-suite-admin-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('gSuiteAdmin')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Google Workspace Admin connection — connect Google Workspace Admin first')
    }
    const gSuiteAdmin = new GSuiteAdminService(cred, variables)

    return { gSuiteAdmin }
  }
)
