import { UnauthorizedError } from '@pikku/core/errors'
import { SalesforceService } from './salesforce-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('salesforce')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Salesforce connection — connect Salesforce first')
    }
    const salesforce = new SalesforceService(cred, variables)

    return { salesforce }
  }
)
