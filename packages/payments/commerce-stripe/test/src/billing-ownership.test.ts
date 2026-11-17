import assert from 'node:assert/strict'
import test from 'node:test'
import {
  attachPaymentToInvoice,
  cancelPaymentIntent,
  createInstallmentSchedule,
  getBankTransferInstructions,
  updateInvoice,
  voidInvoice,
} from '@pikku/addon-commerce-stripe'
import { createServices, createTestDb } from './harness.js'

const session = (userId: string) => ({ session: { userId } }) as any

/** Ada owns cus_ada; everything under /…/mine is hers, /…/theirs is Bob's. */
const setup = async () => {
  const kysely = createTestDb()
  await kysely
    .insertInto('paymentCustomer')
    .values([
      { id: 'c1', ownerType: 'user', ownerId: 'ada', stripeCustomerId: 'cus_ada', email: null, stripeAccount: null, createdAt: '2026-09-01' },
      { id: 'c2', ownerType: 'user', ownerId: 'bob', stripeCustomerId: 'cus_bob', email: null, stripeAccount: null, createdAt: '2026-09-01' },
    ])
    .execute()
  return createServices(kysely, {
    replies: {
      '/invoices/in_mine': { id: 'in_mine', customer: 'cus_ada', status: 'open' },
      '/invoices/in_theirs': { id: 'in_theirs', customer: 'cus_bob', status: 'open' },
      '/payment_intents/pi_mine': { id: 'pi_mine', customer: 'cus_ada', status: 'requires_action' },
      '/payment_intents/pi_theirs': { id: 'pi_theirs', customer: { id: 'cus_bob' }, status: 'requires_action' },
      '/payment_intents/pi_orphan': { id: 'pi_orphan', customer: null, status: 'requires_action' },
    },
  })
}

test("another owner's invoice or payment intent reads as not found and is never mutated", async () => {
  const { services, posts } = await setup()
  const calls = [
    () => voidInvoice.func(services, { stripeInvoiceId: 'in_theirs' }, session('ada')),
    () => updateInvoice.func(services, { stripeInvoiceId: 'in_theirs', description: 'x' }, session('ada')),
    () => cancelPaymentIntent.func(services, { paymentIntentId: 'pi_theirs' }, session('ada')),
    () => getBankTransferInstructions.func(services, { paymentIntentId: 'pi_theirs' }, session('ada')),
    () => getBankTransferInstructions.func(services, { paymentIntentId: 'pi_orphan' }, session('ada')),
  ]
  for (const call of calls) {
    await assert.rejects(call, /No such Stripe resource/)
  }
  assert.equal(posts.length, 0)
})

test('an anonymous caller cannot touch any resource', async () => {
  const { services, posts } = await setup()
  await assert.rejects(
    voidInvoice.func(services, { stripeInvoiceId: 'in_mine' }, {} as any),
    /No such Stripe resource/
  )
  assert.equal(posts.length, 0)
})

test("the caller's own resources go through", async () => {
  const { services, posts } = await setup()
  await voidInvoice.func(services, { stripeInvoiceId: 'in_mine' }, session('ada'))
  await cancelPaymentIntent.func(services, { paymentIntentId: 'pi_mine' }, session('ada'))
  assert.deepEqual(
    posts.map((p) => p.path),
    ['/invoices/in_mine/void', '/payment_intents/pi_mine/cancel']
  )
})

test("attaching needs both halves to be the caller's", async () => {
  const { services, posts } = await setup()
  await assert.rejects(
    attachPaymentToInvoice.func(
      services,
      { stripeInvoiceId: 'in_mine', paymentIntentId: 'pi_theirs' },
      session('ada')
    ),
    /No such Stripe resource/
  )
  await assert.rejects(
    attachPaymentToInvoice.func(
      services,
      { stripeInvoiceId: 'in_theirs', paymentIntentId: 'pi_mine' },
      session('ada')
    ),
    /No such Stripe resource/
  )
  assert.equal(posts.length, 0)

  await attachPaymentToInvoice.func(
    services,
    { stripeInvoiceId: 'in_mine', paymentIntentId: 'pi_mine' },
    session('ada')
  )
  assert.deepEqual(posts.map((p) => p.path), ['/invoices/in_mine/attach_payment'])
})

test('an installment plan derives a distinct, stable idempotency key per Stripe request', async () => {
  const { services, posts } = await setup()
  const data = { amountMinor: 30000, currency: 'eur', installments: 3, idempotencyKey: 'order_42' }
  await createInstallmentSchedule.func(services, data, session('ada'))
  await createInstallmentSchedule.func(services, data, session('ada'))

  const keys = posts.map((p) => p.idempotencyKey)
  assert.deepEqual(keys.slice(0, 3), [
    'installments:order_42:first-price',
    'installments:order_42:base-price',
    'installments:order_42:schedule',
  ])
  // The retry replays the same keys, which is what makes Stripe dedupe it.
  assert.deepEqual(keys.slice(3), keys.slice(0, 3))
})

test('an installment plan that would bill zero in an installment is refused', async () => {
  const { services, posts } = await setup()
  await assert.rejects(
    createInstallmentSchedule.func(
      services,
      { amountMinor: 2, currency: 'eur', installments: 3, idempotencyKey: 'k' },
      session('ada')
    ),
    /at least one minor currency unit/
  )
  assert.equal(posts.filter((p) => p.path !== '/customers').length, 0)
})
