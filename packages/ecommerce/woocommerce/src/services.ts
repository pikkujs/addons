import { WebhookSigningSecret } from '@pikku/core/hmac'
import { WoocommerceService } from './woocommerce-api.service.js'
import { pikkuAddonServices, pikkuAddonWireServices } from '#pikku/addon/setup'

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

export const createSingletonServices = pikkuAddonServices(async (_config, { credentialService }) => ({
  woocommerceWebhookSecret: WebhookSigningSecret.fromCredential(
    'WooCommerce',
    credentialService,
    'woocommerceWebhookSecret'
  ),
}))
