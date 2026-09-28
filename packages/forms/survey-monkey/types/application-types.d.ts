import type { WebhookSigningSecret } from '@pikku/core/hmac'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { SurveyMonkeyService } from '../src/survey-monkey-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  surveyMonkeyWebhookSecret: WebhookSigningSecret
  surveyMonkey: SurveyMonkeyService
}

export interface Services extends CoreServices<SingletonServices> {}
