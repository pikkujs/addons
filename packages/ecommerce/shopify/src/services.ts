import { ShopifyService } from './shopify-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = await secrets.getSecret('SHOPIFY_CREDENTIALS')
  const shopify = new ShopifyService(creds)

  return { shopify }
})
