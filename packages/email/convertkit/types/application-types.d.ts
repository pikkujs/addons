import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { ConvertkitService } from '../src/convertkit-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  convertkitWebhookSecret: WebhookSigningSecret
  convertkit: ConvertkitService
}

export interface Services extends CoreServices<SingletonServices> {}
