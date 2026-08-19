import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { RocketchatService } from '../src/rocketchat-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  rocketchat: RocketchatService
}

export interface Services extends CoreServices<SingletonServices> {}
