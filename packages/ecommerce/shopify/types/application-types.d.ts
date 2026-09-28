import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { ShopifyService } from '../src/shopify-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  shopifyWebhookSecret: WebhookSigningSecret
  shopify: ShopifyService
}

export interface Services extends CoreServices<SingletonServices> {}
