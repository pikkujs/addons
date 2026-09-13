import type { CachedFlagSourceOptions } from '@pikku/core/flag'
import { UnleashService } from './unleash-api.service.js'
import type { UnleashSecrets } from './unleash.secret.js'
import { UnleashFlagApi } from './flags/unleash-flag-api.service.js'
import { UnleashFlagMapper } from './flags/unleash-flag-mapper.js'
import { UnleashFeatureFlagSource } from './flags/unleash-feature-flag.source.js'

export interface CreateUnleashOptions {
  flags?: CachedFlagSourceOptions
}

export interface UnleashAddon {
  /** The client API, for the addon's own functions and anything custom. */
  service: UnleashService
  /** Unleash as a read-only `FeatureFlagSource`. */
  featureFlags: UnleashFeatureFlagSource
}

/**
 * Everything this addon offers, from one set of credentials.
 *
 * The transport exists so the flag source and the addon's functions share one
 * HTTP client and one credential read; assembling it by hand at every call site
 * was never the point of that, which is what this is for. The classes stay
 * exported for composing by hand or injecting a fake.
 */
export const createUnleash = (
  credentials: UnleashSecrets | UnleashService,
  options: CreateUnleashOptions = {}
): UnleashAddon => {
  const service =
    credentials instanceof UnleashService
      ? credentials
      : new UnleashService(credentials)

  let featureFlags: UnleashFeatureFlagSource | undefined

  return {
    service,
    get featureFlags() {
      if (!featureFlags) {
        featureFlags = new UnleashFeatureFlagSource(
          new UnleashFlagApi(service),
          new UnleashFlagMapper(),
          options.flags ?? {}
        )
      }
      return featureFlags
    },
  }
}
