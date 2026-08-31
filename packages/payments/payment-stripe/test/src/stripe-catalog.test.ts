import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createPrice, ensureVariantPrice, pushProduct, syncVariantPrice } from '@pikku/addon-payment-stripe'
import { createServices, createTestDb, seedProduct } from './harness.js'

test('pushProduct creates when unmirrored and updates when mirrored', async () => {
  const { stripeApi, posts } = createServices(createTestDb(), {
    replies: { '/products': { id: 'prod_1' } },
  })

  await pushProduct(stripeApi as any, {
    stripeProductId: null,
    name: 'Kettle',
    description: null,
    imageUrl: null,
    active: 1,
  })
  await pushProduct(stripeApi as any, {
    stripeProductId: 'prod_1',
    name: 'Kettle',
    description: 'Boils water',
    imageUrl: 'https://img/kettle.png',
    active: 0,
  })

  assert.equal(posts[0]!.path, '/products')
  assert.deepEqual(posts[0]!.body, { name: 'Kettle', active: true })
  assert.equal(posts[1]!.path, '/products/prod_1')
  assert.deepEqual(posts[1]!.body, {
    name: 'Kettle',
    description: 'Boils water',
    images: ['https://img/kettle.png'],
    active: false,
  })
})

test('createPrice omits the recurring block for a one-off price', async () => {
  const { stripeApi, posts } = createServices(createTestDb(), {
    replies: { '/prices': { id: 'price_1' } },
  })

  await createPrice(stripeApi as any, {
    stripeProductId: 'prod_1',
    amountMinor: 2500,
    currency: 'eur',
    recurringInterval: null,
  })

  assert.deepEqual(posts[0]!.body, { product: 'prod_1', unit_amount: 2500, currency: 'eur' })
})

test('syncVariantPrice on an unknown variant returns null rather than creating a stray Price', async () => {
  const kysely = createTestDb()
  const { stripeApi, posts } = createServices(kysely)

  const result = await syncVariantPrice(stripeApi as any, kysely, 'nope', 'prod_1')

  assert.equal(result, null)
  assert.equal(posts.length, 0)
})

test('syncVariantPrice archives the previous Price only when there was one', async () => {
  const kysely = createTestDb()
  const { stripeApi, posts } = createServices(kysely, { replies: { '/prices': { id: 'price_2' } } })
  const { variantId } = await seedProduct(kysely)
  await kysely
    .updateTable('paymentVariant')
    .set({ stripePriceId: null })
    .where('id', '=', variantId)
    .execute()

  await syncVariantPrice(stripeApi as any, kysely, variantId, 'prod_1')
  assert.deepEqual(posts.map((p) => p.path), ['/prices'])

  await syncVariantPrice(stripeApi as any, kysely, variantId, 'prod_1')
  assert.deepEqual(posts.map((p) => p.path), ['/prices', '/prices', '/prices/price_2'])
})

test('ensureVariantPrice returns the mirrored Price without calling Stripe', async () => {
  const kysely = createTestDb()
  const { stripeApi, posts } = createServices(kysely)
  const { variantId } = await seedProduct(kysely)

  const priceId = await ensureVariantPrice(stripeApi as any, kysely, variantId)

  assert.equal(priceId, 'price_test')
  assert.equal(posts.length, 0)
})

test('ensureVariantPrice creates the Price a failed push never made', async () => {
  const kysely = createTestDb()
  const { stripeApi, posts } = createServices(kysely, { replies: { '/prices': { id: 'price_9' } } })
  const { variantId } = await seedProduct(kysely)
  await kysely
    .updateTable('paymentVariant')
    .set({ stripePriceId: null })
    .where('id', '=', variantId)
    .execute()

  const priceId = await ensureVariantPrice(stripeApi as any, kysely, variantId)

  assert.equal(priceId, 'price_9')
  assert.deepEqual(posts.map((p) => p.path), ['/prices'])
})

test('ensureVariantPrice creates the Product too when neither ever landed', async () => {
  const kysely = createTestDb()
  const { stripeApi, posts } = createServices(kysely, {
    replies: { '/products': { id: 'prod_9' }, '/prices': { id: 'price_9' } },
  })
  const { productId, variantId } = await seedProduct(kysely)
  await kysely
    .updateTable('paymentVariant')
    .set({ stripePriceId: null })
    .where('id', '=', variantId)
    .execute()
  await kysely
    .updateTable('paymentProduct')
    .set({ stripeProductId: null })
    .where('id', '=', productId)
    .execute()

  const priceId = await ensureVariantPrice(stripeApi as any, kysely, variantId)

  assert.equal(priceId, 'price_9')
  assert.deepEqual(posts.map((p) => p.path), ['/products', '/prices'])
  assert.equal(posts[1]!.body.product, 'prod_9')

  const product = await kysely
    .selectFrom('paymentProduct')
    .select(['stripeProductId'])
    .where('id', '=', productId)
    .executeTakeFirstOrThrow()
  assert.equal(product.stripeProductId, 'prod_9')
})

test('ensureVariantPrice on an unknown variant throws rather than selling nothing', async () => {
  const kysely = createTestDb()
  const { stripeApi } = createServices(kysely)

  await assert.rejects(
    () => ensureVariantPrice(stripeApi as any, kysely, 'nope'),
    /Unknown variant nope/
  )
})
