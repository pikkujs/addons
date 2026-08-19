import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { OpenThesaurusService } from '../src/open-thesaurus-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  openThesaurus: OpenThesaurusService
}

export interface Services extends CoreServices<SingletonServices> {}
