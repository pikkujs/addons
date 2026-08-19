import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { SecurityScorecardService } from '../src/security-scorecard-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  securityScorecard: SecurityScorecardService
}

export interface Services extends CoreServices<SingletonServices> {}
