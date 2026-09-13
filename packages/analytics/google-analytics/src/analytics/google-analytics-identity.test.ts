import { describe, test } from 'node:test'
import * as assert from 'node:assert'
import { googleAnalyticsIdentity } from './google-analytics-identity.js'
import { GoogleAnalyticsMapper } from './google-analytics-mapper.js'

const wireWith = (cookies: Record<string, string> = {}) => {
  const written: Array<{ name: string; value: string; options: any }> = []
  const wire = {
    http: {
      request: { cookie: (name: string) => cookies[name] ?? null },
      response: {
        cookie: (name: string, value: string, options: any) => {
          written.push({ name, value, options })
        },
      },
    },
  } as any
  return { wire, written }
}

describe('googleAnalyticsIdentity', () => {
  test('returns what gtag already wrote, minting nothing', () => {
    const { wire, written } = wireWith({ _ga: 'GA1.1.123456789.1700000000' })

    const identity = googleAnalyticsIdentity()(wire)

    assert.equal(identity?.vendorIds?.['gaClientId'], 'GA1.1.123456789.1700000000')
    assert.equal(written.length, 0)
  })

  test('mints a cookie the mapper can read a client id out of', () => {
    const { wire } = wireWith()

    const identity = googleAnalyticsIdentity()(wire)
    const mapped = new GoogleAnalyticsMapper().toEvent({
      name: 'purchase',
      occurredAt: '2026-09-13T10:00:00.000Z',
      userIdentity: { userId: 'u1', ...identity },
      source: 'server',
    })

    assert.match(identity?.vendorIds?.['gaClientId']!, /^GA1\.1\.\d{9}\.\d+$/)
    assert.match(mapped?.clientId!, /^\d{9}\.\d+$/)
  })

  test('stores nothing before the purpose it requires is granted', () => {
    const { wire, written } = wireWith()

    const identity = googleAnalyticsIdentity({ requires: ['ads'] })(wire, {
      consent: {},
    })

    assert.equal(identity, undefined)
    assert.equal(written.length, 0)
  })

  test('is unreadable to scripts unless the page still runs gtag', () => {
    const { wire, written } = wireWith()
    googleAnalyticsIdentity()(wire)
    assert.equal(written[0]?.options.httpOnly, true)

    const readable = wireWith()
    googleAnalyticsIdentity({ readableByScripts: true })(readable.wire)
    assert.equal(readable.written[0]?.options.httpOnly, false)
  })

  test('resolves nothing on a wire with no browser behind it', () => {
    assert.equal(googleAnalyticsIdentity()({} as any), undefined)
  })
})
