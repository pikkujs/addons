import { describe, test } from 'node:test'
import * as assert from 'node:assert'
import { GoogleAnalyticsSink } from './google-analytics.sink.js'
import type {
  GA4Payload,
  GoogleAnalyticsService,
} from '../google-analytics-api.service.js'
import type { AnalyticsRecord } from '@pikku/core/analytics'

const sent: GA4Payload[] = []
const api = {
  sendEvents: async (payload: GA4Payload) => {
    sent.push(payload)
  },
} as unknown as GoogleAnalyticsService

const record = (overrides: Partial<AnalyticsRecord> = {}): AnalyticsRecord => ({
  name: 'purchase',
  occurredAt: '2026-09-13T10:00:00.000Z',
  userIdentity: { userId: 'u1', vendorIds: { gaClientId: '11.22' } },
  source: 'server',
  ...overrides,
})

describe('GoogleAnalyticsSink', () => {
  test('groups one visitor at one instant into a single payload', async () => {
    sent.length = 0
    await new GoogleAnalyticsSink(api).write([
      record(),
      record({ name: 'refund' }),
    ])

    assert.equal(sent.length, 1)
    assert.equal(sent[0]?.client_id, '11.22')
    assert.equal(sent[0]?.user_id, 'u1')
    assert.deepEqual(
      sent[0]?.events.map((event) => event.name),
      ['purchase', 'refund']
    )
  })

  test('splits visitors apart, because a payload belongs to one', async () => {
    sent.length = 0
    await new GoogleAnalyticsSink(api).write([
      record(),
      record({
        userIdentity: { userId: 'u2', vendorIds: { gaClientId: '33.44' } },
      }),
    ])

    assert.deepEqual(
      sent.map((payload) => payload.client_id),
      ['11.22', '33.44']
    )
  })

  test('splits instants apart, so a batch does not misdate its members', async () => {
    sent.length = 0
    await new GoogleAnalyticsSink(api).write([
      record(),
      record({ occurredAt: '2026-09-13T10:00:05.000Z' }),
    ])

    assert.deepEqual(
      sent.map((payload) => payload.timestamp_micros),
      ['1789293600000000', '1789293605000000']
    )
  })

  test('caps a payload at the 25 events GA4 accepts', async () => {
    sent.length = 0
    await new GoogleAnalyticsSink(api).write(
      Array.from({ length: 26 }, () => record())
    )

    assert.deepEqual(
      sent.map((payload) => payload.events.length),
      [25, 1]
    )
  })

  test('sends nothing at all when no record carries a client id', async () => {
    sent.length = 0
    await new GoogleAnalyticsSink(api).write([
      record({ userIdentity: { userId: 'u1' } }),
    ])

    assert.equal(sent.length, 0)
  })
})
