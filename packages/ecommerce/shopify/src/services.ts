import { ShopifyService } from './shopify-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = (await secrets.getSecret('SHOPIFY_CREDENTIALS')).reveal()
  const shopify = new ShopifyService(creds)

  return { shopify }
})
