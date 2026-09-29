import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { MailchimpService } from '../src/mailchimp-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  mailchimpWebhookSecret: WebhookSigningSecret
  mailchimp: MailchimpService
}

export interface Services extends CoreServices<SingletonServices> {}
