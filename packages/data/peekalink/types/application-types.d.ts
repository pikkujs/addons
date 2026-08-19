import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { PeekalinkService } from '../src/peekalink-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  peekalink: PeekalinkService
}

export interface Services extends CoreServices<SingletonServices> {}
