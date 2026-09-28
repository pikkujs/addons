import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { GhostService } from '../src/ghost-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  ghostWebhookSecret: WebhookSigningSecret
  ghost: GhostService
}

export interface Services extends CoreServices<SingletonServices> {}
