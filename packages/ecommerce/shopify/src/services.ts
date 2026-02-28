import { ShopifyService } from './shopify-api.service.js'
import type { ShopifySecrets } from './shopify.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = await secrets.getSecretJSON<ShopifySecrets>('SHOPIFY_CREDENTIALS')
  const shopify = new ShopifyService(creds)

  return { shopify }
})
