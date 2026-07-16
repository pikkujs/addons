import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { GoogleBooksService } from '../src/google-books-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  googleBooks: GoogleBooksService
}

export interface Services extends CoreServices<SingletonServices> {}
