import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { TwilioService } from '../src/twilio-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  twilioWebhookSecret: WebhookSigningSecret
  twilio: TwilioService
}

export interface Services extends CoreServices<SingletonServices> {}
