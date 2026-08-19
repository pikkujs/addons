import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { LinkedinService } from '../src/linkedin-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  linkedin: LinkedinService
}

export interface Services extends CoreServices<SingletonServices> {}
