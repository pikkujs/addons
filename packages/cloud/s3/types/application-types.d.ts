import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { S3Client } from '@aws-sdk/client-s3'
import type { ContentService } from '@pikku/core'

export interface Config extends CoreConfig {}
export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  s3Client: S3Client
  content: ContentService
}

export interface Services extends CoreServices<SingletonServices> {}
