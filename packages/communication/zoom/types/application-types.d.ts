import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { ZoomService } from '../src/zoom-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  zoomWebhookSecret: WebhookSigningSecret
  zoom: ZoomService
}

export interface Services extends CoreServices<SingletonServices> {}
