import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'

test('icalendar addon', async (t) => {
  const singletonServices = await createSingletonServices({}, {})
  const rpc = rpcService.getContextRPCService(singletonServices, {})

  await t.test('creates calendar with a single event', async () => {
    const result = await rpc.invoke('icalendar:icalendarCreate', {
      events: [{
        summary: 'Team Meeting',
        start: '2025-03-01T10:00:00Z',
        end: '2025-03-01T11:00:00Z',
      }],
    })
    assert.equal(result.eventCount, 1)
    assert.ok(result.ics.includes('BEGIN:VCALENDAR'))
    assert.ok(result.ics.includes('BEGIN:VEVENT'))
    assert.ok(result.ics.includes('Team Meeting'))
    assert.ok(result.ics.includes('END:VCALENDAR'))
  })

  await t.test('creates calendar with name', async () => {
    const result = await rpc.invoke('icalendar:icalendarCreate', {
      name: 'My Calendar',
      events: [{
        summary: 'Event',
        start: '2025-03-01T10:00:00Z',
      }],
    })
    assert.ok(result.ics.includes('My Calendar'))
  })

  await t.test('creates calendar with method', async () => {
    const result = await rpc.invoke('icalendar:icalendarCreate', {
      method: 'REQUEST',
      events: [{
        summary: 'Event',
        start: '2025-03-01T10:00:00Z',
      }],
    })
    assert.ok(result.ics.includes('METHOD:REQUEST'))
  })

  await t.test('creates event with description and location', async () => {
    const result = await rpc.invoke('icalendar:icalendarCreate', {
      events: [{
        summary: 'Conference',
        start: '2025-06-15T09:00:00Z',
        end: '2025-06-15T17:00:00Z',
        description: 'Annual tech conference',
        location: 'Convention Center',
      }],
    })
    assert.ok(result.ics.includes('Annual tech conference'))
    assert.ok(result.ics.includes('Convention Center'))
  })

  await t.test('creates event with organizer', async () => {
    const result = await rpc.invoke('icalendar:icalendarCreate', {
      events: [{
        summary: 'Meeting',
        start: '2025-03-01T10:00:00Z',
        organizer: { name: 'Alice', email: 'alice@example.com' },
      }],
    })
    assert.ok(result.ics.includes('alice@example.com'))
  })

  await t.test('creates event with attendees', async () => {
    const result = await rpc.invoke('icalendar:icalendarCreate', {
      events: [{
        summary: 'Meeting',
        start: '2025-03-01T10:00:00Z',
        attendees: [
          { name: 'Bob', email: 'bob@example.com' },
          { email: 'carol@example.com' },
        ],
      }],
    })
    assert.ok(result.ics.includes('bob@example.com'))
    assert.ok(result.ics.includes('carol@example.com'))
  })

  await t.test('creates multiple events', async () => {
    const result = await rpc.invoke('icalendar:icalendarCreate', {
      events: [
        { summary: 'Event 1', start: '2025-03-01T10:00:00Z' },
        { summary: 'Event 2', start: '2025-03-02T10:00:00Z' },
        { summary: 'Event 3', start: '2025-03-03T10:00:00Z' },
      ],
    })
    assert.equal(result.eventCount, 3)
    assert.ok(result.ics.includes('Event 1'))
    assert.ok(result.ics.includes('Event 2'))
    assert.ok(result.ics.includes('Event 3'))
  })

  await t.test('creates all-day event', async () => {
    const result = await rpc.invoke('icalendar:icalendarCreate', {
      events: [{
        summary: 'Holiday',
        start: '2025-12-25T00:00:00Z',
        allDay: true,
      }],
    })
    assert.ok(result.ics.includes('Holiday'))
    assert.equal(result.eventCount, 1)
  })
})
