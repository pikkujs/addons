import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { GoogleAnalyticsService } from '../src/google-analytics-api.service.js'
import type { GoogleAnalyticsReportingService } from '../src/google-analytics-reporting.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  googleAnalytics: GoogleAnalyticsService
  googleAnalyticsReporting?: GoogleAnalyticsReportingService
}

export interface Services extends CoreServices<SingletonServices> {}
