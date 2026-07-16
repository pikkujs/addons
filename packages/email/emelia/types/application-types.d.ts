import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { EmeliaService } from '../src/emelia-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  emelia: EmeliaService
}

export interface Services extends CoreServices<SingletonServices> {}
