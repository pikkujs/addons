import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { ClockifyService } from '../src/clockify-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  clockify: ClockifyService
}

export interface Services extends CoreServices<SingletonServices> {}
