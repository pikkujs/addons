import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { TaigaService } from '../src/taiga-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  taigaWebhookSecret: WebhookSigningSecret
  taiga: TaigaService
}

export interface Services extends CoreServices<SingletonServices> {}
