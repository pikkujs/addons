import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { FreshdeskService } from '../src/freshdesk-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  freshdeskWebhookSecret: WebhookSigningSecret
  freshdesk: FreshdeskService
}

export interface Services extends CoreServices<SingletonServices> {}
