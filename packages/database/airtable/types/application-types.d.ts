import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { AirtableService } from '../src/airtable-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  airtableWebhookSecret: WebhookSigningSecret
  airtable: AirtableService
}

export interface Services extends CoreServices<SingletonServices> {}
