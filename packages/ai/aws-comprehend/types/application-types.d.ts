import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { AwsComprehendService } from '../src/aws-comprehend-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  awsComprehend: AwsComprehendService
}

export interface Services extends CoreServices<SingletonServices> {}
