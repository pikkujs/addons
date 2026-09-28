import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { WoocommerceService } from '../src/woocommerce-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  woocommerceWebhookSecret: WebhookSigningSecret
  woocommerce: WoocommerceService
}

export interface Services extends CoreServices<SingletonServices> {}
