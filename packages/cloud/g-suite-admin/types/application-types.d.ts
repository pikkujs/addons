import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { GSuiteAdminService } from '../src/g-suite-admin-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  gSuiteAdmin: GSuiteAdminService
}

export interface Services extends CoreServices<SingletonServices> {}
