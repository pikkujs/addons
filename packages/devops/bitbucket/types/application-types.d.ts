import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { BitbucketService } from '../src/bitbucket-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  bitbucket: BitbucketService
}

export interface Services extends CoreServices<SingletonServices> {}
