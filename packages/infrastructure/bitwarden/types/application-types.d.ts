import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { BitwardenService } from '../src/bitwarden-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  bitwarden: BitwardenService
}

export interface Services extends CoreServices<SingletonServices> {}
