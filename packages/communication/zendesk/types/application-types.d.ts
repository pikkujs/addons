import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { ZendeskService } from '../src/zendesk-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  zendesk: ZendeskService
}

export interface Services extends CoreServices<SingletonServices> {}
