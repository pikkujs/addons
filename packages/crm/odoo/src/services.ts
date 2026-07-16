import { OdooService } from './odoo-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('odoo')
    if (!cred?.apiKey) {
      throw new Error('Missing odoo credential')
    }
    const odoo = new OdooService(cred, variables)

    return { odoo }
  }
)
