import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { AwsLambdaService } from '../src/aws-lambda-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  awsLambda: AwsLambdaService
}

export interface Services extends CoreServices<SingletonServices> {}
