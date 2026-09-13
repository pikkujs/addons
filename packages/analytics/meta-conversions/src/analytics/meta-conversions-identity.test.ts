import { describe, test } from 'node:test'
import * as assert from 'node:assert'
import { metaConversionsIdentity } from './meta-conversions-identity.js'

const wireWith = (
  cookies: Record<string, string> = {},
  query: Record<string, string> = {}
) => {
  const written: Array<{ name: string; value: string; options: any }> = []
  const wire = {
    http: {
      request: {
        cookie: (name: string) => cookies[name] ?? null,
        query: () => query,
      },
      response: {
        cookie: (name: string, value: string, options: any) => {
          written.push({ name, value, options })
        },
      },
    },
  } as any
  return { wire, written }
}

describe('metaConversionsIdentity', () => {
  test('returns what the pixel already wrote, minting nothing', () => {
    const { wire, written } = wireWith({ _fbp: 'fb.1.1.a', _fbc: 'fb.1.2.b' })

    const identity = metaConversionsIdentity()(wire)

    assert.deepEqual(identity?.vendorIds, { fbp: 'fb.1.1.a', fbc: 'fb.1.2.b' })
    assert.equal(written.length, 0)
  })

  test('mints fbp in the documented format where no pixel runs', () => {
    const { wire } = wireWith()

    const fbp = metaConversionsIdentity()(wire)?.vendorIds?.['fbp']

    assert.match(fbp!, /^fb\.1\.\d+\.\d{10}$/)
  })

  test('derives fbc from the click id Meta put on the URL', () => {
    const { wire } = wireWith({}, { fbclid: 'CLICK123' })

    const fbc = metaConversionsIdentity()(wire)?.vendorIds?.['fbc']

    assert.match(fbc!, /^fb\.1\.\d+\.CLICK123$/)
  })

  test('a newer click replaces the stored one, or the wrong ad gets credit', () => {
    const { wire, written } = wireWith(
      { _fbc: 'fb.1.111.OLDCLICK' },
      { fbclid: 'NEWCLICK' }
    )

    const fbc = metaConversionsIdentity()(wire)?.vendorIds?.['fbc']

    assert.match(fbc!, /NEWCLICK$/)
    assert.equal(written.some((cookie) => cookie.name === '_fbc'), true)
  })

  test('keeps the stored click on a request that carries none', () => {
    const { wire, written } = wireWith({ _fbc: 'fb.1.111.OLDCLICK' })

    const fbc = metaConversionsIdentity()(wire)?.vendorIds?.['fbc']

    assert.equal(fbc, 'fb.1.111.OLDCLICK')
    assert.equal(written.some((cookie) => cookie.name === '_fbc'), false)
  })

  test('stores nothing before the purpose it requires is granted', () => {
    const { wire, written } = wireWith({}, { fbclid: 'CLICK123' })

    const identity = metaConversionsIdentity({ requires: ['ads'] })(wire, {
      consent: { ads: false },
    })

    assert.equal(identity, undefined)
    assert.equal(written.length, 0)
  })

  test('is unreadable to scripts unless the page still runs the pixel', () => {
    const { wire, written } = wireWith()
    metaConversionsIdentity()(wire)
    assert.equal(written[0]?.options.httpOnly, true)

    const readable = wireWith()
    metaConversionsIdentity({ readableByScripts: true })(readable.wire)
    assert.equal(readable.written[0]?.options.httpOnly, false)
  })
})
