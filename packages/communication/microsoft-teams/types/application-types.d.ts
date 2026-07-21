import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { MicrosoftTeamsService } from '../src/microsoft-teams-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  microsoftTeams: MicrosoftTeamsService
}

export interface Services extends CoreServices<SingletonServices> {}
