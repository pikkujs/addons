import { WebhookSigningSecret } from '@pikku/core/hmac'
import { ShopifyService } from './shopify-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets, credentialService }) => {
  const creds = (await secrets.getSecret('SHOPIFY_CREDENTIALS')).reveal()
  const shopify = new ShopifyService(creds)

  const shopifyWebhookSecret = WebhookSigningSecret.fromCredential(
    'Shopify',
    credentialService,
    'shopifyWebhookSecret'
  )


  return { shopify, shopifyWebhookSecret }
})
