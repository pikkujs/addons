import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { QuickbaseService } from '../src/quickbase-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  quickbase: QuickbaseService
}

export interface Services extends CoreServices<SingletonServices> {}
