import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { MetaConversionsService } from '../src/meta-conversions-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  metaConversions: MetaConversionsService
}

export interface Services extends CoreServices<SingletonServices> {}
