import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { PlentymarketsService } from '../src/plentymarkets-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  plentymarkets: PlentymarketsService
}

export interface Services extends CoreServices<SingletonServices> {}
