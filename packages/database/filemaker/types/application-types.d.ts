import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { FilemakerService } from '../src/filemaker-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  filemaker: FilemakerService
}

export interface Services extends CoreServices<SingletonServices> {}
