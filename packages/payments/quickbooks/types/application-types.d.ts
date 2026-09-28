import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { QuickbooksService } from '../src/quickbooks-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  quickbooksWebhookSecret: WebhookSigningSecret
  quickbooks: QuickbooksService
}

export interface Services extends CoreServices<SingletonServices> {}
