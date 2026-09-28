import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { MailgunService } from '../src/mailgun-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  mailgunWebhookSecret: WebhookSigningSecret
  mailgun: MailgunService
}

export interface Services extends CoreServices<SingletonServices> {}
