import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { LinearService } from '../src/linear-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  linearWebhookSecret: WebhookSigningSecret
  linear: LinearService
}

export interface Services extends CoreServices<SingletonServices> {}
