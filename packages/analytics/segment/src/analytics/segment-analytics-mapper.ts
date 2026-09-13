import type { AnalyticsRecord } from '@pikku/core/analytics'

export interface SegmentTrackCall {
  type: 'track'
  event: string
  userId?: string
  anonymousId?: string
  properties?: Record<string, unknown>
  timestamp: string
  context: Record<string, unknown>
}

export interface SegmentAnalyticsMapperOptions {
  /** Segment event name for a pikku event name, where the two differ. */
  nameMap?: Record<string, string>
  /** Group type the organization is sent as. Defaults to `groupId`. */
  groupIdKey?: string
}

/**
 * Translates a pikku analytics record into one Segment `track` call. Pure: no
 * I/O, no batching, no client.
 *
 * Segment insists on exactly one of `userId` or `anonymousId`, and treats them
 * as the same person once an `identify` links them — which is why an anonymous
 * record sends a device id rather than falling back to a literal, and why props
 * are left alone. Segment is itself a fan-out, so the
 * shape a destination wants is that destination's mapping to make, not this
 * sink's to guess.
 */
export class SegmentAnalyticsMapper {
  constructor(private readonly options: SegmentAnalyticsMapperOptions = {}) {}

  toCall(record: AnalyticsRecord): SegmentTrackCall | undefined {
    const { userId, orgId, pikkuUserId, anonymousId } = record.userIdentity
    const anonymous = anonymousId ?? pikkuUserId
    if (!userId && !anonymous) return undefined

    return {
      type: 'track',
      event: this.options.nameMap?.[record.name] ?? record.name,
      ...(userId ? { userId } : { anonymousId: anonymous! }),
      ...(record.props === undefined ? {} : { properties: record.props }),
      timestamp: record.occurredAt,
      context: {
        library: { name: 'pikku' },
        ...(orgId === undefined
          ? {}
          : { [this.options.groupIdKey ?? 'groupId']: orgId }),
        ...(record.traceId === undefined ? {} : { pikkuTraceId: record.traceId }),
        ...(record.functionId === undefined
          ? {}
          : { pikkuFunctionId: record.functionId }),
        ...(record.wireType === undefined
          ? {}
          : { pikkuWireType: record.wireType }),
        pikkuSource: record.source,
      },
    }
  }
}
