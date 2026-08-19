import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { GoogleContactsService } from '../src/google-contacts-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  googleContacts: GoogleContactsService
}

export interface Services extends CoreServices<SingletonServices> {}
