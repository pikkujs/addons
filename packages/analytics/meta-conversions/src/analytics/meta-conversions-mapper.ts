import type { AnalyticsRecord } from '@pikku/core/analytics'
import type { MetaEvent } from '../meta-conversions-api.service.js'

export interface MetaConversionsMapperOptions {
  /** Meta event name for a pikku event name, e.g. `{ checkout: 'Purchase' }`. */
  nameMap?: Record<string, string>
  /** `AnalyticsIdentity.vendorIds` keys carrying the browser's Meta cookies. */
  vendorIdKeys?: {
    fbp?: string
    fbc?: string
    clientIp?: string
    userAgent?: string
  }
  /**
   * Prop holding the id the browser pixel sent for the same action. Without a
   * matching id on both halves Meta counts the conversion twice.
   */
  eventIdProp?: string
  /**
   * Prop name to `user_data` key, for the personal fields Meta requires hashed.
   * Emails are lowercased and phones stripped to digits before hashing, which
   * is the normalisation Meta matches on — hashing the raw value produces a
   * digest that matches nobody.
   */
  hashedProps?: Record<string, string>
}

const DEFAULT_HASHED_PROPS: Record<string, string> = {
  email: 'em',
  phone: 'ph',
}

const normalise = (key: string, value: string): string =>
  key === 'ph'
    ? value.replace(/\D/g, '')
    : value.trim().toLowerCase()

/**
 * Web Crypto rather than `node:crypto` so the mapper runs unchanged on a worker
 * runtime, which is what makes `toEvent` async.
 */
const sha256 = async (value: string): Promise<string> => {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(value)
  )
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

const isScalar = (value: unknown): value is string | number | boolean =>
  typeof value === 'string' ||
  typeof value === 'number' ||
  typeof value === 'boolean'

/**
 * Translates a pikku analytics record into one Meta Conversions API event.
 * Pure apart from hashing: no I/O, no batching, no client.
 *
 * Returns `undefined` where the record identifies nobody Meta can match on.
 * That is the whole job — the API accepts an event with an empty `user_data`
 * and reports it as received, having matched it to no one, so the honest
 * failure has to happen here rather than in the response.
 *
 * `fbp` and `fbc` originate in the browser and reach this through
 * `AnalyticsIdentity.vendorIds`, resolved server-side from first-party cookies.
 * The client's IP and user agent belong there too where match quality matters:
 * they are per-request, and a record flushed from a queue no longer has them.
 */
export class MetaConversionsMapper {
  constructor(private readonly options: MetaConversionsMapperOptions = {}) {}

  async toEvent(record: AnalyticsRecord): Promise<MetaEvent | undefined> {
    const { userId, vendorIds } = record.userIdentity
    const keys = this.options.vendorIdKeys ?? {}
    const fbp = vendorIds?.[keys.fbp ?? 'fbp']
    const fbc = vendorIds?.[keys.fbc ?? 'fbc']
    const clientIp = vendorIds?.[keys.clientIp ?? 'clientIp']
    const userAgent = vendorIds?.[keys.userAgent ?? 'userAgent']

    const userData: MetaEvent['user_data'] = {}
    if (fbp) userData['fbp'] = fbp
    if (fbc) userData['fbc'] = fbc
    if (clientIp) userData['client_ip_address'] = clientIp
    if (userAgent) userData['client_user_agent'] = userAgent
    if (userId) userData['external_id'] = await sha256(userId)

    const hashedProps = this.options.hashedProps ?? DEFAULT_HASHED_PROPS
    const consumed = new Set(Object.keys(hashedProps))
    for (const [prop, key] of Object.entries(hashedProps)) {
      const value = record.props?.[prop]
      if (typeof value === 'string' && value.length > 0) {
        userData[key] = await sha256(normalise(key, value))
      }
    }

    if (Object.keys(userData).length === 0) return undefined

    const eventIdProp = this.options.eventIdProp ?? 'eventId'
    consumed.add(eventIdProp)
    const eventId = record.props?.[eventIdProp]

    const customData: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(record.props ?? {})) {
      if (!consumed.has(key) && isScalar(value)) {
        customData[key] = value
      }
    }

    return {
      event_name: this.options.nameMap?.[record.name] ?? record.name,
      event_time: Math.floor(Date.parse(record.occurredAt) / 1000),
      ...(typeof eventId === 'string' ? { event_id: eventId } : {}),
      action_source: fbp || fbc ? 'website' : 'system_generated',
      user_data: userData,
      ...(Object.keys(customData).length === 0
        ? {}
        : { custom_data: customData }),
    }
  }
}
