import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { WebflowService } from '../src/webflow-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  webflowWebhookSecret: WebhookSigningSecret
  webflow: WebflowService
}

export interface Services extends CoreServices<SingletonServices> {}
