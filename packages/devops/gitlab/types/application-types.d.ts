import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { GitlabService } from '../src/gitlab-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  gitlabWebhookSecret: WebhookSigningSecret
  gitlab: GitlabService
}

export interface Services extends CoreServices<SingletonServices> {}
