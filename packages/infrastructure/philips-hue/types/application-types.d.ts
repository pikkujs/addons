import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { PhilipsHueService } from '../src/philips-hue-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  philipsHue: PhilipsHueService
}

export interface Services extends CoreServices<SingletonServices> {}
