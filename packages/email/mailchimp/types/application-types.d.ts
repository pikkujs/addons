import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { MailchimpService } from '../src/mailchimp-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  mailchimp: MailchimpService
}

export interface Services extends CoreServices<SingletonServices> {}
