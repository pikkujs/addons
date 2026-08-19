import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { BambooHrService } from '../src/bamboo-hr-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  bambooHr: BambooHrService
}

export interface Services extends CoreServices<SingletonServices> {}
