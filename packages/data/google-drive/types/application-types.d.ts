import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { GoogleDriveService } from '../src/google-drive-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  googleDrive: GoogleDriveService
}

export interface Services extends CoreServices<SingletonServices> {}
