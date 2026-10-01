import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { MailerLiteService } from '../src/mailer-lite-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  mailerLite: MailerLiteService
}

export interface Services extends CoreServices<SingletonServices> {}
