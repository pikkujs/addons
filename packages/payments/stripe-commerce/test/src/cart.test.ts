import assert from 'node:assert/strict'
import test from 'node:test'
import { loadCart, openCart } from '@pikku/addon-stripe-commerce'
import { createTestDb, seedProduct } from './harness.js'

const NOW = '2026-08-31T13:00:00.000Z'

const addItem = async (kysely: any, cartId: string, variantId: string, quantity: number) =>
  await kysely
    .insertInto('paymentCartItem')
    .values({ id: crypto.randomUUID(), cartId, variantId, quantity, createdAt: NOW, updatedAt: NOW })
    .execute()

test('a cart is priced from the catalogue, not from a snapshot', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely, { amountMinor: 2500 })
  const cartId = await openCart(kysely, undefined, null)
  await addItem(kysely, cartId, variantId, 2)

  assert.equal((await loadCart(kysely, cartId)).subtotalMinor, 5000)

  await kysely.updateTable('paymentVariant').set({ amountMinor: 3000 }).where('id', '=', variantId).execute()

  const repriced = await loadCart(kysely, cartId)
  assert.equal(repriced.subtotalMinor, 6000)
  assert.equal(repriced.lines[0]!.unitAmountMinor, 3000)
})

test('a physical line makes the whole cart require shipping', async () => {
  const kysely = createTestDb()
  const digital = await seedProduct(kysely, { requiresShipping: false })
  const physical = await seedProduct(kysely, { requiresShipping: true })
  const cartId = await openCart(kysely, undefined, null)

  await addItem(kysely, cartId, digital.variantId, 1)
  assert.equal((await loadCart(kysely, cartId)).requiresShipping, false)

  await addItem(kysely, cartId, physical.variantId, 1)
  assert.equal((await loadCart(kysely, cartId)).requiresShipping, true)
})

test('a line asking for more than remains is reported unavailable', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely, { stock: 1 })
  const cartId = await openCart(kysely, undefined, null)
  await addItem(kysely, cartId, variantId, 3)

  const line = (await loadCart(kysely, cartId)).lines[0]!
  assert.equal(line.available, false)
  assert.equal(line.stock, 1)
})

test('an untracked variant is always available', async () => {
  const kysely = createTestDb()
  const { variantId } = await seedProduct(kysely, { stock: null })
  const cartId = await openCart(kysely, undefined, null)
  await addItem(kysely, cartId, variantId, 999)

  assert.equal((await loadCart(kysely, cartId)).lines[0]!.available, true)
})

test('an open cart is reused for its token', async () => {
  const kysely = createTestDb()
  const first = await openCart(kysely, undefined, null)
  const { token } = await loadCart(kysely, first)

  assert.equal(await openCart(kysely, token, null), first)
})

test('a converted cart yields a new cart with a new token', async () => {
  const kysely = createTestDb()
  const first = await openCart(kysely, undefined, null)
  const { token } = await loadCart(kysely, first)
  await kysely.updateTable('paymentCart').set({ status: 'converted' }).where('id', '=', first).execute()

  const second = await openCart(kysely, token, null)
  assert.notEqual(second, first)
  assert.notEqual((await loadCart(kysely, second)).token, token)
})

test('an unknown token opens a cart holding that token', async () => {
  const kysely = createTestDb()
  const cartId = await openCart(kysely, 'from-the-browser', null)
  assert.equal((await loadCart(kysely, cartId)).token, 'from-the-browser')
})
