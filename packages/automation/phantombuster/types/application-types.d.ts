import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { PhantombusterService } from '../src/phantombuster-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  phantombuster: PhantombusterService
}

export interface Services extends CoreServices<SingletonServices> {}
