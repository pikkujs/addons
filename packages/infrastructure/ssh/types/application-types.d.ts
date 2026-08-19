import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { Client } from 'ssh2'
import type { ContentService } from '@pikku/core/services'

export interface Config extends CoreConfig {}
export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  sshClient: Client
  content: ContentService
}

export interface Services extends CoreServices<SingletonServices> {}
