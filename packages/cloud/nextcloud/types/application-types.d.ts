import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { NextcloudService } from '../src/nextcloud-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  nextcloud: NextcloudService
}

export interface Services extends CoreServices<SingletonServices> {}
