import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { SurveyMonkeyService } from '../src/survey-monkey-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  surveyMonkey: SurveyMonkeyService
}

export interface Services extends CoreServices<SingletonServices> {}
