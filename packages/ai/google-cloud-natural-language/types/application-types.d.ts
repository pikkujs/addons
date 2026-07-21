import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { GoogleCloudNaturalLanguageService } from '../src/google-cloud-natural-language-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  googleCloudNaturalLanguage: GoogleCloudNaturalLanguageService
}

export interface Services extends CoreServices<SingletonServices> {}
