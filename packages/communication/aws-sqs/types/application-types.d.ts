import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { AwsSqsService } from '../src/aws-sqs-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  awsSqs: AwsSqsService
}

export interface Services extends CoreServices<SingletonServices> {}
