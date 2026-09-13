import type { AnalyticsRecord } from '@pikku/core/analytics'
import type { PostHogCaptureEvent } from './posthog-analytics.types.js'

export interface PostHogAnalyticsMapperOptions {
  /** PostHog event name for a pikku event name, where the two differ. */
  nameMap?: Record<string, string>
}

/**
 * Translates a pikku analytics record into one PostHog capture event. Pure: no
 * I/O, no batching, no client.
 *
 * `distinct_id` is the identity PostHog joins every other event on, so it must
 * be stable for one person across sign-in. `pikkuUserId` is the fallback rather
 * than a random id: it survives the anonymous half of a session, where a
 * per-record id would make each event its own person.
 */
export class PostHogAnalyticsMapper {
  constructor(private readonly options: PostHogAnalyticsMapperOptions = {}) {}

  toEvent(record: AnalyticsRecord): PostHogCaptureEvent {
    const { userId, orgId, pikkuUserId } = record.userIdentity

    return {
      event: this.options.nameMap?.[record.name] ?? record.name,
      distinct_id: userId ?? pikkuUserId ?? 'anonymous',
      timestamp: record.occurredAt,
      properties: {
        ...record.props,
        ...(orgId === undefined ? {} : { $groups: { organization: orgId } }),
        $lib: 'pikku',
        pikku_source: record.source,
        ...(record.traceId === undefined ? {} : { pikku_trace_id: record.traceId }),
        ...(record.functionId === undefined
          ? {}
          : { pikku_function_id: record.functionId }),
        ...(record.wireType === undefined
          ? {}
          : { pikku_wire_type: record.wireType }),
      },
    }
  }
}
