import type { CachedFlagSourceOptions } from '@pikku/core/flag'
import { PosthogService } from './posthog-api.service.js'
import type { PosthogSecrets } from './posthog.secret.js'
import { PostHogFlagApi } from './flags/posthog-flag-api.service.js'
import { PostHogFlagMapper } from './flags/posthog-flag-mapper.js'
import { PostHogFeatureFlagSource } from './flags/posthog-feature-flag.source.js'
import { PostHogAnalyticsSink } from './analytics/posthog-analytics.sink.js'
import {
  PostHogAnalyticsMapper,
  type PostHogAnalyticsMapperOptions,
} from './analytics/posthog-analytics-mapper.js'

export interface CreatePostHogOptions {
  flags?: CachedFlagSourceOptions
  analytics?: PostHogAnalyticsMapperOptions
}

export interface PostHogAddon {
  /** The management API, for the addon's own functions and anything custom. */
  service: PosthogService
  /** PostHog as a read-only `FeatureFlagSource`. */
  featureFlags: PostHogFeatureFlagSource
  /** PostHog as an `AnalyticsService`. */
  analyticsSink: PostHogAnalyticsSink
}

/**
 * Everything this addon offers, from one set of credentials.
 *
 * The three-class split behind it — transport, mapper, source — exists so
 * flags, analytics and the addon's own functions share one HTTP client and one
 * credential read rather than each owning a private `fetch` wrapper. That is a
 * reason for the split to exist, not a reason for it to be assembled by hand at
 * every call site, which is what this factory is for. The classes stay exported
 * for composing by hand or injecting a fake.
 *
 * Both halves are built lazily: asking for flags should not construct an
 * analytics sink whose missing project key would throw for a use nobody made.
 */
export const createPostHog = (
  credentials: PosthogSecrets | PosthogService,
  options: CreatePostHogOptions = {}
): PostHogAddon => {
  const service =
    credentials instanceof PosthogService
      ? credentials
      : new PosthogService(credentials)

  let featureFlags: PostHogFeatureFlagSource | undefined
  let analyticsSink: PostHogAnalyticsSink | undefined

  return {
    service,
    get featureFlags() {
      if (!featureFlags) {
        const projectApiKey = service.projectApiKey
        if (!projectApiKey) {
          throw new Error(
            'PostHog feature flags need `projectApiKey` in POSTHOG_CREDENTIALS: ' +
              'local evaluation is the only endpoint that returns whole flag ' +
              'definitions, and it identifies the project by that key.'
          )
        }
        featureFlags = new PostHogFeatureFlagSource(
          new PostHogFlagApi(service, projectApiKey),
          new PostHogFlagMapper(),
          options.flags ?? {}
        )
      }
      return featureFlags
    },
    get analyticsSink() {
      if (!analyticsSink) {
        analyticsSink = new PostHogAnalyticsSink(
          service,
          new PostHogAnalyticsMapper(options.analytics)
        )
      }
      return analyticsSink
    },
  }
}
