import { AgileCrmService } from './agile-crm-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('agileCrm')
    if (!cred?.apiKey) {
      throw new Error('Missing agileCrm credential')
    }
    const agileCrm = new AgileCrmService(cred, variables)

    return { agileCrm }
  }
)
