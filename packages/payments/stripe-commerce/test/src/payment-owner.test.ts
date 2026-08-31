import assert from 'node:assert/strict'
import test from 'node:test'
import { SessionPaymentOwner } from '@pikku/addon-stripe-commerce'

test('the default owner is the session user', async () => {
  const owner = new SessionPaymentOwner()
  assert.deepEqual(await owner.resolve({ userId: 'user_1' }), { type: 'user', id: 'user_1' })
})

test('an organization-billed app resolves the session org instead', async () => {
  const owner = new SessionPaymentOwner('organization')
  assert.deepEqual(await owner.resolve({ userId: 'user_1', orgId: 'org_1' }), {
    type: 'organization',
    id: 'org_1',
  })
  assert.equal(await owner.resolve({ userId: 'user_1' }), null)
})

test('an anonymous visitor has no owner', async () => {
  assert.equal(await new SessionPaymentOwner().resolve(), null)
  assert.equal(await new SessionPaymentOwner().resolve({}), null)
})
