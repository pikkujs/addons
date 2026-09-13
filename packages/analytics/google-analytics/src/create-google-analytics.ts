import type { AnalyticsIdentityResolver } from '@pikku/core/analytics'
import { GoogleAnalyticsService } from './google-analytics-api.service.js'
import type { GoogleAnalyticsSecrets } from './google-analytics.secret.js'
import { GoogleAnalyticsSink } from './analytics/google-analytics.sink.js'
import {
  GoogleAnalyticsMapper,
  type GoogleAnalyticsMapperOptions,
} from './analytics/google-analytics-mapper.js'
import {
  googleAnalyticsIdentity,
  type GoogleAnalyticsIdentityOptions,
} from './analytics/google-analytics-identity.js'

export interface CreateGoogleAnalyticsOptions {
  analytics?: GoogleAnalyticsMapperOptions
  identity?: GoogleAnalyticsIdentityOptions
}

export interface GoogleAnalyticsAddon {
  /** The Measurement Protocol client, including `validateEvents`. */
  service: GoogleAnalyticsService
  /** GA4 as an `AnalyticsService`. */
  analyticsSink: GoogleAnalyticsSink
  /** Resolves — and mints, where no gtag.js does — GA4's `client_id`. */
  identity: AnalyticsIdentityResolver
}

/**
 * Everything this addon offers, from one set of credentials.
 *
 * The sink and the identity resolver are two halves of one thing and are worth
 * taking together: the sink drops any record with no `client_id`, so wiring it
 * without the resolver on a page that runs no gtag.js collects nothing at all,
 * silently and forever.
 */
export const createGoogleAnalytics = (
  credentials: GoogleAnalyticsSecrets | GoogleAnalyticsService,
  options: CreateGoogleAnalyticsOptions = {}
): GoogleAnalyticsAddon => {
  const service =
    credentials instanceof GoogleAnalyticsService
      ? credentials
      : new GoogleAnalyticsService(credentials)

  let analyticsSink: GoogleAnalyticsSink | undefined

  return {
    service,
    get analyticsSink() {
      if (!analyticsSink) {
        analyticsSink = new GoogleAnalyticsSink(
          service,
          new GoogleAnalyticsMapper(options.analytics)
        )
      }
      return analyticsSink
    },
    identity: googleAnalyticsIdentity(options.identity),
  }
}
