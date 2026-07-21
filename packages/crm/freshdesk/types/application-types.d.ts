import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { FreshdeskService } from '../src/freshdesk-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  freshdesk: FreshdeskService
}

export interface Services extends CoreServices<SingletonServices> {}
