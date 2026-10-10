import { describe, test } from 'node:test'
import * as assert from 'node:assert'
import { GoogleAnalyticsMapper } from './google-analytics-mapper.js'
import type { AnalyticsRecord } from '@pikku/core/analytics'

const record = (overrides: Partial<AnalyticsRecord> = {}): AnalyticsRecord => ({
  name: 'purchase',
  props: { plan: 'pro' },
  occurredAt: '2026-09-13T10:00:00.000Z',
  userIdentity: {
    userId: 'u1',
    vendorIds: { gaClientId: 'GA1.1.123456789.1700000000' },
  },
  source: 'server',
  ...overrides,
})

describe('GoogleAnalyticsMapper', () => {
  test('reads the client id out of the _ga cookie value', () => {
    const mapped = new GoogleAnalyticsMapper().toEvent(record())

    assert.equal(mapped?.clientId, '123456789.1700000000')
    assert.equal(mapped?.userId, 'u1')
    assert.equal(mapped?.event.name, 'purchase')
    assert.equal(mapped?.event.params?.['plan'], 'pro')
  })

  test('accepts a bare client id, for an app that reads it from gtag', () => {
    const mapped = new GoogleAnalyticsMapper().toEvent(
      record({
        userIdentity: { userId: null, vendorIds: { gaClientId: '55.66' } },
      })
    )

    assert.equal(mapped?.clientId, '55.66')
    assert.equal(mapped?.userId, undefined)
  })

  test('sends nothing where there is no browser behind the event', () => {
    assert.equal(
      new GoogleAnalyticsMapper().toEvent(record({ userIdentity: { userId: 'u1' } })),
      undefined
    )
  })

  test('refuses a client id it cannot recognise rather than inventing one', () => {
    const mapped = new GoogleAnalyticsMapper().toEvent(
      record({ userIdentity: { userId: 'u1', vendorIds: { gaClientId: 'nonsense' } } })
    )

    assert.equal(mapped, undefined)
  })

  test('stamps engagement time, so the hit starts a session', () => {
    const mapped = new GoogleAnalyticsMapper().toEvent(record())

    assert.equal(mapped?.event.params?.['engagement_time_msec'], 1)
  })

  test('carries the session id when the app resolved one', () => {
    const mapped = new GoogleAnalyticsMapper().toEvent(
      record({
        userIdentity: {
          userId: 'u1',
          vendorIds: { gaClientId: '55.66', gaSessionId: '1700000123' },
        },
      })
    )

    assert.equal(mapped?.event.params?.['session_id'], '1700000123')
  })

  test('drops a prop GA4 cannot store rather than stringifying it', () => {
    const mapped = new GoogleAnalyticsMapper().toEvent(
      record({ props: { plan: 'pro', items: [{ sku: 'a' }], missing: null } })
    )

    assert.equal(mapped?.event.params?.['plan'], 'pro')
    assert.equal('items' in (mapped?.event.params ?? {}), false)
    assert.equal('missing' in (mapped?.event.params ?? {}), false)
  })

  test('renames through the map and carries the pikku context', () => {
    const mapped = new GoogleAnalyticsMapper({
      nameMap: { purchase: 'in_app_purchase' },
    }).toEvent(record({ traceId: 't-1', functionId: 'f-1', wireType: 'http' }))

    assert.equal(mapped?.event.name, 'in_app_purchase')
    assert.equal(mapped?.event.params?.['pikku_trace_id'], 't-1')
    assert.equal(mapped?.event.params?.['pikku_function_id'], 'f-1')
    assert.equal(mapped?.event.params?.['pikku_wire_type'], 'http')
    assert.equal(mapped?.event.params?.['pikku_source'], 'server')
  })
})
