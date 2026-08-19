import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { AwsTranscribeService } from '../src/aws-transcribe-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  awsTranscribe: AwsTranscribeService
}

export interface Services extends CoreServices<SingletonServices> {}
