import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { GoogleDocsService } from '../src/google-docs-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  googleDocs: GoogleDocsService
}

export interface Services extends CoreServices<SingletonServices> {}
