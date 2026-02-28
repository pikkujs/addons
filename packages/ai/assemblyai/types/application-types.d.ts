import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { ContentService } from '@pikku/core/services'
import type { AssemblyaiService } from '../src/assemblyai-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  assemblyai: AssemblyaiService
  content: ContentService
}

export interface Services extends CoreServices<SingletonServices> {}
