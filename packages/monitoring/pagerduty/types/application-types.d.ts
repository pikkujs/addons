import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { PagerdutyService } from '../src/pagerduty-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  pagerduty: PagerdutyService
}

export interface Services extends CoreServices<SingletonServices> {}
