import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { TapfiliateService } from '../src/tapfiliate-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  tapfiliate: TapfiliateService
}

export interface Services extends CoreServices<SingletonServices> {}
