import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { AgileCrmService } from '../src/agile-crm-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  agileCrm: AgileCrmService
}

export interface Services extends CoreServices<SingletonServices> {}
