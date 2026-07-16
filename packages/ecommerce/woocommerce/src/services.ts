import { WoocommerceService } from './woocommerce-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('woocommerce')
    if (!cred?.apiKey) {
      throw new Error('Missing woocommerce credential')
    }
    const woocommerce = new WoocommerceService(cred, variables)

    return { woocommerce }
  }
)
