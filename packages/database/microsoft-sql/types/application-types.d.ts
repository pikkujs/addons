import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { MicrosoftSqlService } from '../src/microsoft-sql-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  microsoftSql: MicrosoftSqlService
}

export interface Services extends CoreServices<SingletonServices> {}
