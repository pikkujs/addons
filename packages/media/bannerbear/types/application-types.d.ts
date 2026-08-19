import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { BannerbearService } from '../src/bannerbear-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  bannerbear: BannerbearService
}

export interface Services extends CoreServices<SingletonServices> {}
