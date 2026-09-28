import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { YoutubeService } from '../src/youtube-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  youtubeWebhookSecret: WebhookSigningSecret
  youtube: YoutubeService
}

export interface Services extends CoreServices<SingletonServices> {}
