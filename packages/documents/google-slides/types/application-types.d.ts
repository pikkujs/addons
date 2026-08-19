import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { GoogleSlidesService } from '../src/google-slides-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  googleSlides: GoogleSlidesService
}

export interface Services extends CoreServices<SingletonServices> {}
