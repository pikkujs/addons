import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { UptimerobotService } from '../src/uptimerobot-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  uptimerobot: UptimerobotService
}

export interface Services extends CoreServices<SingletonServices> {}
