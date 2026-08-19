import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { ServicenowService } from '../src/servicenow-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  servicenow: ServicenowService
}

export interface Services extends CoreServices<SingletonServices> {}
