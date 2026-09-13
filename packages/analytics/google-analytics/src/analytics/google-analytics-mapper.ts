import type { AnalyticsRecord } from '@pikku/core/analytics'
import type { GA4Event } from '../google-analytics-api.service.js'

export interface GA4MappedEvent {
  clientId: string
  userId?: string
  event: GA4Event
}

export interface GoogleAnalyticsMapperOptions {
  /** GA4 event name for a pikku event name, where the two differ. */
  nameMap?: Record<string, string>
  /** `AnalyticsIdentity.vendorIds` key holding the `_ga` cookie value. */
  clientIdKey?: string
  /** `AnalyticsIdentity.vendorIds` key holding the GA4 session id. */
  sessionIdKey?: string
}

const GA_COOKIE = /^GA\d+\.\d+\.(.+)$/

/**
 * The `_ga` cookie is `GA1.1.<client_id>`, where the client id is itself
 * dotted. A sink cannot mint one: GA4 joins the Measurement Protocol hit to the
 * browser's own session on this exact value, so a generated id produces a
 * second, permanently anonymous user rather than a missing one.
 */
const clientIdFromCookie = (value: string): string | undefined => {
  const match = GA_COOKIE.exec(value)
  if (match) return match[1]
  // Already a bare client id, e.g. read from gtag rather than the cookie.
  return /^\d+\.\d+$/.test(value) ? value : undefined
}

const isScalar = (value: unknown): value is string | number | boolean =>
  typeof value === 'string' ||
  typeof value === 'number' ||
  typeof value === 'boolean'

/**
 * Translates a pikku analytics record into one GA4 Measurement Protocol event.
 * Pure: no I/O, no batching, no client.
 *
 * Returns `undefined` where the record carries no GA client id. That is not a
 * failure to report — a cron task and a queue worker have no browser behind
 * them, and GA4 answers 204 to a hit with an invented id just as readily as to
 * a real one, so sending would cost a silent second user per event.
 *
 * Nested and null props are dropped rather than stringified: GA4 params take
 * scalars only, and a stringified object is a parameter nobody can segment on.
 */
export class GoogleAnalyticsMapper {
  constructor(private readonly options: GoogleAnalyticsMapperOptions = {}) {}

  toEvent(record: AnalyticsRecord): GA4MappedEvent | undefined {
    const { userId, vendorIds } = record.userIdentity
    const raw = vendorIds?.[this.options.clientIdKey ?? 'gaClientId']
    if (!raw) return undefined
    const clientId = clientIdFromCookie(raw)
    if (!clientId) return undefined

    const params: NonNullable<GA4Event['params']> = {}
    for (const [key, value] of Object.entries(record.props ?? {})) {
      if (isScalar(value)) {
        params[key] = value
      }
    }

    const sessionId = vendorIds?.[this.options.sessionIdKey ?? 'gaSessionId']
    if (sessionId) {
      params['session_id'] = sessionId
    }
    /**
     * Without it GA4 accepts the hit and shows it nowhere: realtime and most
     * standard reports are session-scoped, and a hit contributing no engagement
     * time starts no session.
     */
    params['engagement_time_msec'] = 1
    params['pikku_source'] = record.source
    if (record.traceId !== undefined) params['pikku_trace_id'] = record.traceId
    if (record.functionId !== undefined)
      params['pikku_function_id'] = record.functionId
    if (record.wireType !== undefined) params['pikku_wire_type'] = record.wireType

    return {
      clientId,
      ...(userId === null ? {} : { userId }),
      event: {
        name: this.options.nameMap?.[record.name] ?? record.name,
        params,
      },
    }
  }
}
