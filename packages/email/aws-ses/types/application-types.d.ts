import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { AwsSesService } from '../src/aws-ses-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  awsSes: AwsSesService
}

export interface Services extends CoreServices<SingletonServices> {}
