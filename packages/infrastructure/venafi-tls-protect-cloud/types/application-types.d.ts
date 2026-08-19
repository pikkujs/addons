import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { VenafiTlsProtectCloudService } from '../src/venafi-tls-protect-cloud-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  venafiTlsProtectCloud: VenafiTlsProtectCloudService
}

export interface Services extends CoreServices<SingletonServices> {}
