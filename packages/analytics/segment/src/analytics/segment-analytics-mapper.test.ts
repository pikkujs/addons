import { describe, test } from 'node:test'
import * as assert from 'node:assert'
import { SegmentAnalyticsMapper } from './segment-analytics-mapper.js'
import type { AnalyticsRecord } from '@pikku/core/analytics'

const record = (overrides: Partial<AnalyticsRecord> = {}): AnalyticsRecord => ({
  name: 'signedUp',
  props: { plan: 'pro' },
  occurredAt: '2026-09-13T10:00:00.000Z',
  userIdentity: { userId: 'u1' },
  source: 'server',
  ...overrides,
})

describe('SegmentAnalyticsMapper', () => {
  test('sends a known user as userId, with props untouched', () => {
    const call = new SegmentAnalyticsMapper().toCall(record())

    assert.equal(call?.event, 'signedUp')
    assert.equal(call?.userId, 'u1')
    assert.equal(call?.anonymousId, undefined)
    assert.deepEqual(call?.properties, { plan: 'pro' })
    assert.equal(call?.timestamp, '2026-09-13T10:00:00.000Z')
  })

  test('sends an anonymous user as anonymousId, not as a userId', () => {
    const call = new SegmentAnalyticsMapper().toCall(
      record({ userIdentity: { userId: null, pikkuUserId: 'anon-7' } })
    )

    assert.equal(call?.userId, undefined)
    assert.equal(call?.anonymousId, 'anon-7')
  })

  test('drops a record identifying nobody, rather than inventing a person', () => {
    assert.equal(
      new SegmentAnalyticsMapper().toCall(record({ userIdentity: { userId: null } })),
      undefined
    )
  })

  test('puts the organization and the pikku context on the context', () => {
    const call = new SegmentAnalyticsMapper().toCall(
      record({
        userIdentity: { userId: 'u1', orgId: 'org-1' },
        traceId: 't-1',
        functionId: 'f-1',
        wireType: 'http',
      })
    )

    assert.equal(call?.context['groupId'], 'org-1')
    assert.equal(call?.context['pikkuTraceId'], 't-1')
    assert.equal(call?.context['pikkuFunctionId'], 'f-1')
    assert.equal(call?.context['pikkuWireType'], 'http')
    assert.deepEqual(call?.context['library'], { name: 'pikku' })
  })

  test('renames through the map', () => {
    const call = new SegmentAnalyticsMapper({
      nameMap: { signedUp: 'Signed Up' },
    }).toCall(record())

    assert.equal(call?.event, 'Signed Up')
  })
})
