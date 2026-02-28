import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { GoogleCloudStorageService } from '../src/google-cloud-storage-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  googleCloudStorage: GoogleCloudStorageService
}

export interface Services extends CoreServices<SingletonServices> {}
