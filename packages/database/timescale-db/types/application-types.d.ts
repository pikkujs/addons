import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { TimescaleDbService } from '../src/timescale-db-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  timescaleDb: TimescaleDbService
}

export interface Services extends CoreServices<SingletonServices> {}
