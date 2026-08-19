import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { DropcontactService } from '../src/dropcontact-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  dropcontact: DropcontactService
}

export interface Services extends CoreServices<SingletonServices> {}
