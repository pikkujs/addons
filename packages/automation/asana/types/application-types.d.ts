import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { AsanaService } from '../src/asana-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  asanaWebhookSecret: WebhookSigningSecret
  asana: AsanaService
}

export interface Services extends CoreServices<SingletonServices> {}
