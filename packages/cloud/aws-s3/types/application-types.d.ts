import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { AwsS3Service } from '../src/aws-s3-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  awsS3: AwsS3Service
}

export interface Services extends CoreServices<SingletonServices> {}
