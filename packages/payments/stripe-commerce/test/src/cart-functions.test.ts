import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getCart, setCartItem } from '@pikku/addon-stripe-commerce'
import { createServices, createTestDb, seedProduct } from './harness.js'

test('getCart with no token opens a cart and hands back its token', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely)

  const cart = await getCart.func(services, {}, {} as any)

  assert.ok(cart?.token)
  assert.deepEqual(cart?.lines, [])
  assert.equal(cart?.subtotalMinor, 0)
  assert.equal(cart?.currency, null)
  assert.equal(cart?.requiresShipping, false)

  const again = await getCart.func(services, { token: cart!.token }, {} as any)
  assert.equal(again?.token, cart!.token)
})

test('a signed-in visitor gets the cart attached to their owner', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely)

  const cart = await getCart.func(services, {}, { session: { userId: 'user_1' } } as any)

  const row = await kysely
    .selectFrom('paymentCart')
    .select(['ownerType', 'ownerId'])
    .where('token', '=', cart!.token)
    .executeTakeFirstOrThrow()
  assert.equal(row.ownerType, 'user')
  assert.equal(row.ownerId, 'user_1')
})

test('setting a quantity adds the line and totals it', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely)
  const { variantId, productId } = await seedProduct(kysely)

  const cart = await setCartItem.func(services, { variantId, quantity: 3 }, {} as any)

  assert.equal(cart?.lines.length, 1)
  assert.equal(cart?.lines[0]!.productId, productId)
  assert.equal(cart?.lines[0]!.quantity, 3)
  assert.equal(cart?.lines[0]!.lineAmountMinor, 7500)
  assert.equal(cart?.subtotalMinor, 7500)
  assert.equal(cart?.currency, 'eur')
  assert.equal(cart?.requiresShipping, true)
})

test('setting a quantity is absolute, so a double submit cannot double the line', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely)
  const { variantId } = await seedProduct(kysely)

  const first = await setCartItem.func(services, { variantId, quantity: 2 }, {} as any)
  const second = await setCartItem.func(
    services,
    { token: first!.token, variantId, quantity: 2 },
    {} as any
  )

  assert.equal(second?.lines.length, 1)
  assert.equal(second?.lines[0]!.quantity, 2)
})

test('a quantity of zero removes the line', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely)
  const { variantId } = await seedProduct(kysely)

  const added = await setCartItem.func(services, { variantId, quantity: 2 }, {} as any)
  const removed = await setCartItem.func(
    services,
    { token: added!.token, variantId, quantity: 0 },
    {} as any
  )

  assert.deepEqual(removed?.lines, [])
  assert.equal(removed?.subtotalMinor, 0)
})

test('removing a line that was never there is not an error', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely)

  const cart = await setCartItem.func(services, { variantId: 'nope', quantity: 0 }, {} as any)
  assert.deepEqual(cart?.lines, [])
})

test('refuses an unknown or archived variant', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely)
  const { variantId } = await seedProduct(kysely)

  await assert.rejects(
    () => setCartItem.func(services, { variantId: 'nope', quantity: 1 }, {} as any),
    /is not available/
  )

  await kysely.updateTable('paymentVariant').set({ active: 0 }).where('id', '=', variantId).execute()
  await assert.rejects(
    () => setCartItem.func(services, { variantId, quantity: 1 }, {} as any),
    /is not available/
  )
})

test('refuses more than remains in stock, but allows an untracked variant', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely)
  const { variantId } = await seedProduct(kysely, { stock: 2 })

  await assert.rejects(
    () => setCartItem.func(services, { variantId, quantity: 3 }, {} as any),
    /Only 2 of variant/
  )

  const untracked = createTestDb()
  const { variantId: freeVariant } = await seedProduct(untracked, { stock: null })
  const cart = await setCartItem.func(
    createServices(untracked).services,
    { variantId: freeVariant, quantity: 999 },
    {} as any
  )
  assert.equal(cart?.lines[0]!.quantity, 999)
})

test('refuses to mix currencies in one cart', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely)
  const { variantId: euro } = await seedProduct(kysely)
  const { variantId: dollar } = await seedProduct(kysely)
  await kysely.updateTable('paymentVariant').set({ currency: 'usd' }).where('id', '=', dollar).execute()

  const cart = await setCartItem.func(services, { variantId: euro, quantity: 1 }, {} as any)

  await assert.rejects(
    () =>
      setCartItem.func(
        services,
        { token: cart!.token, variantId: dollar, quantity: 1 },
        {} as any
      ),
    /Cart is in eur and this variant is priced in usd/
  )
})

test('a cart is repriced from the catalogue, not from what the customer first saw', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely)
  const { variantId } = await seedProduct(kysely)
  const cart = await setCartItem.func(services, { variantId, quantity: 2 }, {} as any)
  assert.equal(cart?.subtotalMinor, 5000)

  await kysely
    .updateTable('paymentVariant')
    .set({ amountMinor: 3000 })
    .where('id', '=', variantId)
    .execute()

  const repriced = await getCart.func(services, { token: cart!.token }, {} as any)
  assert.equal(repriced?.subtotalMinor, 6000)
})

test('a line whose stock fell below the quantity is reported unavailable rather than silently trimmed', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely)
  const { variantId } = await seedProduct(kysely)
  const cart = await setCartItem.func(services, { variantId, quantity: 5 }, {} as any)
  assert.equal(cart?.lines[0]!.available, true)

  await kysely.updateTable('paymentVariant').set({ stock: 2 }).where('id', '=', variantId).execute()

  const after = await getCart.func(services, { token: cart!.token }, {} as any)
  assert.equal(after?.lines[0]!.available, false)
  assert.equal(after?.lines[0]!.quantity, 5)
  assert.equal(after?.lines[0]!.stock, 2)
})

test('a converted cart hands the visitor a fresh one rather than reopening it', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely)
  const { variantId } = await seedProduct(kysely)
  const cart = await setCartItem.func(services, { variantId, quantity: 1 }, {} as any)
  await kysely.updateTable('paymentCart').set({ status: 'converted' }).execute()

  const fresh = await getCart.func(services, { token: cart!.token }, {} as any)

  assert.notEqual(fresh?.token, cart!.token)
  assert.deepEqual(fresh?.lines, [])
})

test('a digital-only cart needs no shipping', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely)
  const { variantId } = await seedProduct(kysely, { requiresShipping: false })

  const cart = await setCartItem.func(services, { variantId, quantity: 1 }, {} as any)

  assert.equal(cart?.requiresShipping, false)
})
