import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { UrlScanIoService } from '../src/url-scan-io-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  urlScanIo: UrlScanIoService
}

export interface Services extends CoreServices<SingletonServices> {}
