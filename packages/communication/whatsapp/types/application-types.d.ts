import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { WhatsappService } from '../src/whatsapp-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  whatsappWebhookSecret: WebhookSigningSecret
  whatsapp: WhatsappService
}

export interface Services extends CoreServices<SingletonServices> {}
