import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { GoogleBigQueryService } from '../src/google-big-query-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  googleBigQuery: GoogleBigQueryService
}

export interface Services extends CoreServices<SingletonServices> {}
