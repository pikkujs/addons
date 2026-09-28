import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { JotformService } from '../src/jotform-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  jotformWebhookSecret: WebhookSigningSecret
  jotform: JotformService
}

export interface Services extends CoreServices<SingletonServices> {}
