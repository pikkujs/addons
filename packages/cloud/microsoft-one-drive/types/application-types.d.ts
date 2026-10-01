import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { MicrosoftOneDriveService } from '../src/microsoft-one-drive-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  microsoftOneDrive: MicrosoftOneDriveService
}

export interface Services extends CoreServices<SingletonServices> {}
