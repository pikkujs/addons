import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { ErpnextService } from '../src/erpnext-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  erpnext: ErpnextService
}

export interface Services extends CoreServices<SingletonServices> {}
