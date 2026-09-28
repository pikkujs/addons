import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { TelegramService } from '../src/telegram-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  telegramWebhookSecret: WebhookSigningSecret
  telegram: TelegramService
}

export interface Services extends CoreServices<SingletonServices> {}
