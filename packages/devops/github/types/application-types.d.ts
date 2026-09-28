import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { GithubService } from '../src/github-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  githubWebhookSecret: WebhookSigningSecret
  github: GithubService
}

export interface Services extends CoreServices<SingletonServices> {}
