import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { LingvanexService } from '../src/lingvanex-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  lingvanex: LingvanexService
}

export interface Services extends CoreServices<SingletonServices> {}
