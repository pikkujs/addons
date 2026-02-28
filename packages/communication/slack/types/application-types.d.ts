import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { SlackService } from '../src/slack-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  slack: SlackService
}

export interface Services extends CoreServices<SingletonServices> {}
