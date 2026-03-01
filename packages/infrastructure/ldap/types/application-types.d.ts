import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { Client } from 'ldapts'

export interface Config extends CoreConfig {}
export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  ldapClient: Client
}

export interface Services extends CoreServices<SingletonServices> {}
