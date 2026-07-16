import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { WoocommerceService } from '../src/woocommerce-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  woocommerce: WoocommerceService
}

export interface Services extends CoreServices<SingletonServices> {}
