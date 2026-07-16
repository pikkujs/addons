import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { MicrosoftToDoService } from '../src/microsoft-to-do-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  microsoftToDo: MicrosoftToDoService
}

export interface Services extends CoreServices<SingletonServices> {}
