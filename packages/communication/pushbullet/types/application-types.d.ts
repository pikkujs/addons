import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { PushbulletService } from '../src/pushbullet-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  pushbullet: PushbulletService
}

export interface Services extends CoreServices<SingletonServices> {}
