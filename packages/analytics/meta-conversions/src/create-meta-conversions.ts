import type { AnalyticsIdentityResolver } from '@pikku/core/analytics'
import { MetaConversionsService } from './meta-conversions-api.service.js'
import type { MetaConversionsSecrets } from './meta-conversions.secret.js'
import {
  MetaConversionsSink,
  type MetaConversionsSinkOptions,
} from './analytics/meta-conversions.sink.js'
import {
  MetaConversionsMapper,
  type MetaConversionsMapperOptions,
} from './analytics/meta-conversions-mapper.js'
import {
  metaConversionsIdentity,
  type MetaConversionsIdentityOptions,
} from './analytics/meta-conversions-identity.js'

export interface CreateMetaConversionsOptions {
  analytics?: MetaConversionsMapperOptions
  sink?: MetaConversionsSinkOptions
  identity?: MetaConversionsIdentityOptions
}

export interface MetaConversionsAddon {
  /** The Conversions API client. */
  service: MetaConversionsService
  /** Meta as an `AnalyticsService`. */
  analyticsSink: MetaConversionsSink
  /** Resolves — and mints, where no pixel does — `fbp`, and derives `fbc`. */
  identity: AnalyticsIdentityResolver
}

/**
 * Everything this addon offers, from one set of credentials.
 *
 * The sink and the identity resolver are two halves of one thing: the sink
 * drops any record with nothing in `user_data`, so wiring it without the
 * resolver on a page that runs no pixel sends nothing — and the API would have
 * reported success for those events had they been sent, so nothing anywhere
 * would say so.
 */
export const createMetaConversions = (
  credentials: MetaConversionsSecrets | MetaConversionsService,
  options: CreateMetaConversionsOptions = {}
): MetaConversionsAddon => {
  const service =
    credentials instanceof MetaConversionsService
      ? credentials
      : new MetaConversionsService(credentials)

  let analyticsSink: MetaConversionsSink | undefined

  return {
    service,
    get analyticsSink() {
      if (!analyticsSink) {
        analyticsSink = new MetaConversionsSink(
          service,
          new MetaConversionsMapper(options.analytics),
          options.sink
        )
      }
      return analyticsSink
    },
    identity: metaConversionsIdentity(options.identity),
  }
}
