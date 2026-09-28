import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { MailjetService } from '../src/mailjet-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  mailjetWebhookSecret: WebhookSigningSecret
  mailjet: MailjetService
}

export interface Services extends CoreServices<SingletonServices> {}
