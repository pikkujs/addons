import { describe, test } from 'node:test'
import * as assert from 'node:assert'
import { createHash } from 'node:crypto'
import { MetaConversionsMapper } from './meta-conversions-mapper.js'
import type { AnalyticsRecord } from '@pikku/core/analytics'

const sha256 = (value: string) =>
  createHash('sha256').update(value).digest('hex')

const record = (overrides: Partial<AnalyticsRecord> = {}): AnalyticsRecord => ({
  name: 'checkout',
  occurredAt: '2026-09-13T10:00:00.000Z',
  userIdentity: {
    userId: 'u1',
    vendorIds: { fbp: 'fb.1.1700000000.123', fbc: 'fb.1.1700000000.abc' },
  },
  source: 'server',
  ...overrides,
})

describe('MetaConversionsMapper', () => {
  test('carries the browser cookies and hashes the external id', async () => {
    const event = await new MetaConversionsMapper().toEvent(record())

    assert.equal(event?.event_name, 'checkout')
    assert.equal(event?.event_time, 1789293600)
    assert.equal(event?.action_source, 'website')
    assert.equal(event?.user_data['fbp'], 'fb.1.1700000000.123')
    assert.equal(event?.user_data['external_id'], sha256('u1'))
  })

  test('sends nothing where Meta would have nobody to match on', async () => {
    const event = await new MetaConversionsMapper().toEvent(
      record({ userIdentity: { userId: null } })
    )

    assert.equal(event, undefined)
  })

  test('normalises before hashing, or the digest matches nobody', async () => {
    const event = await new MetaConversionsMapper().toEvent(
      record({ props: { email: '  Ada@Example.COM ', phone: '+1 (555) 010-1234' } })
    )

    assert.equal(event?.user_data['em'], sha256('ada@example.com'))
    assert.equal(event?.user_data['ph'], sha256('15550101234'))
  })

  test('never leaves a hashed prop behind in custom_data', async () => {
    const event = await new MetaConversionsMapper().toEvent(
      record({ props: { email: 'ada@example.com', value: 42 } })
    )

    assert.deepEqual(event?.custom_data, { value: 42 })
  })

  test('takes the pixel event id, which is what stops double counting', async () => {
    const event = await new MetaConversionsMapper().toEvent(
      record({ props: { eventId: 'evt-1' } })
    )

    assert.equal(event?.event_id, 'evt-1')
    assert.equal(event?.custom_data, undefined)
  })

  test('marks an event with no browser behind it as system generated', async () => {
    const event = await new MetaConversionsMapper().toEvent(
      record({ userIdentity: { userId: 'u1' } })
    )

    assert.equal(event?.action_source, 'system_generated')
    assert.equal(event?.user_data['external_id'], sha256('u1'))
  })

  test('renames to a standard Meta event', async () => {
    const event = await new MetaConversionsMapper({
      nameMap: { checkout: 'Purchase' },
    }).toEvent(record())

    assert.equal(event?.event_name, 'Purchase')
  })
})
