import { WebhookSigningSecret } from '@pikku/core/hmac'
import { ShopifyService } from './shopify-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = (await secrets.getSecret('SHOPIFY_CREDENTIALS')).reveal()
  const shopify = new ShopifyService(creds)

  const shopifyWebhookSecret = new WebhookSigningSecret(
    'Shopify',
    await secrets
      .getSecret('SHOPIFY_WEBHOOK_SECRET')
      .then((secret) => secret.reveal())
      .catch(() => null)
  )


  return { shopify, shopifyWebhookSecret }
})
