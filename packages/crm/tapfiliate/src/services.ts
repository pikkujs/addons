import { TapfiliateService } from './tapfiliate-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('tapfiliate')
    if (!cred?.apiKey) {
      throw new Error('Missing tapfiliate credential')
    }
    const tapfiliate = new TapfiliateService(cred, variables)

    return { tapfiliate }
  }
)
