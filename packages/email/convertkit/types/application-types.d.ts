import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { ConvertkitService } from '../src/convertkit-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  convertkit: ConvertkitService
}

export interface Services extends CoreServices<SingletonServices> {}
