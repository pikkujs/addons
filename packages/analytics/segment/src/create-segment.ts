import { SegmentService } from './segment-api.service.js'
import type { SegmentSecrets } from './segment.secret.js'
import { SegmentAnalyticsSink } from './analytics/segment-analytics.sink.js'
import {
  SegmentAnalyticsMapper,
  type SegmentAnalyticsMapperOptions,
} from './analytics/segment-analytics-mapper.js'

export interface CreateSegmentOptions {
  analytics?: SegmentAnalyticsMapperOptions
}

export interface SegmentAddon {
  /** The tracking API client. */
  service: SegmentService
  /** Segment as an `AnalyticsService`. */
  analyticsSink: SegmentAnalyticsSink
}

/**
 * Everything this addon offers, from one set of credentials.
 *
 * No identity resolver, unlike the GA4 and Meta addons: Segment keys on ids the
 * app already has rather than on a cookie a vendor script wrote, so there is
 * nothing here to mint. An anonymous visitor needs a device id, and that one is
 * pikku's rather than Segment's — see `anonymousAnalyticsIdentity`.
 */
export const createSegment = (
  credentials: SegmentSecrets | SegmentService,
  options: CreateSegmentOptions = {}
): SegmentAddon => {
  const service =
    credentials instanceof SegmentService
      ? credentials
      : new SegmentService(credentials)

  let analyticsSink: SegmentAnalyticsSink | undefined

  return {
    service,
    get analyticsSink() {
      if (!analyticsSink) {
        analyticsSink = new SegmentAnalyticsSink(
          service,
          new SegmentAnalyticsMapper(options.analytics)
        )
      }
      return analyticsSink
    },
  }
}
