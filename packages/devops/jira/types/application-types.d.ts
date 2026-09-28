import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { JiraService } from '../src/jira-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  jiraWebhookSecret: WebhookSigningSecret
  jira: JiraService
}

export interface Services extends CoreServices<SingletonServices> {}
