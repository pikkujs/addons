import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { FacebookGraphApiService } from '../src/facebook-graph-api-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  facebookGraphApi: FacebookGraphApiService
}

export interface Services extends CoreServices<SingletonServices> {}
