import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { DropboxService } from '../src/dropbox-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  dropbox: DropboxService
}

export interface Services extends CoreServices<SingletonServices> {}
