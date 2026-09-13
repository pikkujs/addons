import { describe, test } from 'node:test'
import * as assert from 'node:assert'
import { PostHogAnalyticsMapper } from './posthog-analytics-mapper.js'
import type { AnalyticsRecord } from '@pikku/core/analytics'

const record = (overrides: Partial<AnalyticsRecord> = {}): AnalyticsRecord => ({
  name: 'signedUp',
  props: { plan: 'pro' },
  occurredAt: '2026-09-13T10:00:00.000Z',
  userIdentity: { userId: 'u1' },
  source: 'server',
  ...overrides,
})

describe('PostHogAnalyticsMapper', () => {
  test('keys on the user and carries the declared props', () => {
    const event = new PostHogAnalyticsMapper().toEvent(record())

    assert.equal(event.event, 'signedUp')
    assert.equal(event.distinct_id, 'u1')
    assert.equal(event.timestamp, '2026-09-13T10:00:00.000Z')
    assert.equal(event.properties['plan'], 'pro')
  })

  test('falls back to the pikku id, so anonymous events stay one person', () => {
    const event = new PostHogAnalyticsMapper().toEvent(
      record({ userIdentity: { userId: null, pikkuUserId: 'anon-7' } })
    )

    assert.equal(event.distinct_id, 'anon-7')
  })

  test('sends the organization as a group, not a property', () => {
    const event = new PostHogAnalyticsMapper().toEvent(
      record({ userIdentity: { userId: 'u1', orgId: 'org-1' } })
    )

    assert.deepEqual(event.properties['$groups'], { organization: 'org-1' })
  })

  test('renames where the project and PostHog disagree', () => {
    const event = new PostHogAnalyticsMapper({
      nameMap: { signedUp: 'user_signed_up' },
    }).toEvent(record())

    assert.equal(event.event, 'user_signed_up')
  })

  test('marks where the event came from', () => {
    const event = new PostHogAnalyticsMapper().toEvent(
      record({ source: 'client', traceId: 't1', wireType: 'http' })
    )

    assert.equal(event.properties['pikku_source'], 'client')
    assert.equal(event.properties['pikku_trace_id'], 't1')
    assert.equal(event.properties['pikku_wire_type'], 'http')
  })

  test('a declared prop cannot displace the identity', () => {
    const event = new PostHogAnalyticsMapper().toEvent(
      record({ props: { $lib: 'not-pikku' } })
    )

    assert.equal(event.properties['$lib'], 'pikku')
  })
})
