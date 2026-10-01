import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { MicrosoftOutlookService } from '../src/microsoft-outlook-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  microsoftOutlook: MicrosoftOutlookService
}

export interface Services extends CoreServices<SingletonServices> {}
