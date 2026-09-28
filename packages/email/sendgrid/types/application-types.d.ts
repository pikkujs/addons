import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { SendgridService } from '../src/sendgrid-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  sendgridWebhookSecret: WebhookSigningSecret
  sendgrid: SendgridService
}

export interface Services extends CoreServices<SingletonServices> {}
