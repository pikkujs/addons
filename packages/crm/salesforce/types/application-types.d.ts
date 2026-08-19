import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { SalesforceService } from '../src/salesforce-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  salesforce: SalesforceService
}

export interface Services extends CoreServices<SingletonServices> {}
