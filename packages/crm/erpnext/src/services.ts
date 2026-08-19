import { ErpnextService } from './erpnext-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('erpnext')
    if (!cred?.apiKey) {
      throw new Error('Missing erpnext credential')
    }
    const erpnext = new ErpnextService(cred, variables)

    return { erpnext }
  }
)
