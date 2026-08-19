import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { RabbitmqService } from '../src/rabbitmq-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  rabbitmq: RabbitmqService
}

export interface Services extends CoreServices<SingletonServices> {}
