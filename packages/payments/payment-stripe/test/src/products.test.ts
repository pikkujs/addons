import assert from 'node:assert/strict'
import { test } from 'node:test'
import { archiveProduct, listProducts, saveProduct } from '@pikku/addon-payment-stripe'
import { createServices, createTestDb, seedProduct } from './harness.js'

const catalogueReplies = {
  '/products': { id: 'prod_1' },
  '/prices': { id: 'price_1' },
}

const kettle = {
  slug: 'kettle',
  name: 'Kettle',
  variants: [{ name: 'Standard', amountMinor: 2500, currency: 'eur' }],
}

test('saving a new product writes the row and mirrors it onto Stripe', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, { replies: catalogueReplies })

  const result = await saveProduct.func(services, kettle, {} as any)

  assert.equal(result?.stripeProductId, 'prod_1')
  assert.equal(result?.variantIds.length, 1)
  assert.deepEqual(
    posts.map((p) => p.path),
    ['/products', '/prices']
  )
  assert.equal(posts[1]!.body.unit_amount, 2500)
  assert.equal(posts[1]!.body.currency, 'eur')
  assert.equal(posts[1]!.body.product, 'prod_1')
  assert.equal(posts[1]!.body.recurring, undefined)

  const variant = await kysely
    .selectFrom('paymentVariant')
    .select(['stripePriceId', 'position'])
    .where('id', '=', result!.variantIds[0]!)
    .executeTakeFirstOrThrow()
  assert.equal(variant.stripePriceId, 'price_1')
  assert.equal(variant.position, 0)
})

test('a recurring variant is pushed as a recurring price', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, { replies: catalogueReplies })

  await saveProduct.func(
    services,
    {
      ...kettle,
      variants: [{ name: 'Annual', amountMinor: 9900, currency: 'eur', recurringInterval: 'year' }],
    },
    {} as any
  )

  assert.deepEqual(posts[1]!.body.recurring, { interval: 'year' })
})

test('a product defaults to shipping-required and active, and stores metadata as JSON', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely, { replies: catalogueReplies })

  const result = await saveProduct.func(
    services,
    { ...kettle, metadata: { origin: 'de' } },
    {} as any
  )

  const product = await kysely
    .selectFrom('paymentProduct')
    .selectAll()
    .where('id', '=', result!.id)
    .executeTakeFirstOrThrow()
  assert.equal(product.requiresShipping, 1)
  assert.equal(product.active, 1)
  assert.deepEqual(JSON.parse(product.metadata!), { origin: 'de' })
})

test('a digital product is saved as not requiring shipping', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely, { replies: catalogueReplies })

  const result = await saveProduct.func(
    services,
    { ...kettle, requiresShipping: false },
    {} as any
  )

  const product = await kysely
    .selectFrom('paymentProduct')
    .select(['requiresShipping'])
    .where('id', '=', result!.id)
    .executeTakeFirstOrThrow()
  assert.equal(product.requiresShipping, 0)
})

test('re-saving an unchanged price does not churn a new Stripe Price', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, { replies: catalogueReplies })

  const first = await saveProduct.func(services, kettle, {} as any)
  posts.length = 0

  await saveProduct.func(
    services,
    {
      ...kettle,
      id: first!.id,
      variants: [{ id: first!.variantIds[0], name: 'Standard', amountMinor: 2500, currency: 'eur' }],
    },
    {} as any
  )

  assert.deepEqual(
    posts.map((p) => p.path),
    ['/products/prod_1']
  )
})

test('a price change creates a replacement Price and archives the old one', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, {
    replies: { '/products': { id: 'prod_1' }, '/prices': { id: 'price_2' } },
  })

  const first = await saveProduct.func(services, kettle, {} as any)
  posts.length = 0

  await saveProduct.func(
    services,
    {
      ...kettle,
      id: first!.id,
      variants: [{ id: first!.variantIds[0], name: 'Standard', amountMinor: 3000, currency: 'eur' }],
    },
    {} as any
  )

  assert.deepEqual(
    posts.map((p) => p.path),
    ['/products/prod_1', '/prices', '/prices/price_2']
  )
  assert.deepEqual(posts[2]!.body, { active: false })

  const variant = await kysely
    .selectFrom('paymentVariant')
    .select(['stripePriceId', 'amountMinor'])
    .where('id', '=', first!.variantIds[0]!)
    .executeTakeFirstOrThrow()
  assert.equal(variant.amountMinor, 3000)
  assert.equal(variant.stripePriceId, 'price_2')
})

test('a currency change also replaces the Price', async () => {
  const kysely = createTestDb()
  const { services, posts } = createServices(kysely, { replies: catalogueReplies })
  const first = await saveProduct.func(services, kettle, {} as any)
  posts.length = 0

  await saveProduct.func(
    services,
    {
      ...kettle,
      id: first!.id,
      variants: [{ id: first!.variantIds[0], name: 'Standard', amountMinor: 2500, currency: 'usd' }],
    },
    {} as any
  )

  assert.ok(posts.some((p) => p.path === '/prices'))
})

test('a failed Stripe push still saves the product, leaving the mirror null for checkout to fill', async () => {
  const kysely = createTestDb()
  const { services, logger } = createServices(kysely, { fail: '/products' })

  const result = await saveProduct.func(services, kettle, {} as any)

  assert.equal(result?.stripeProductId, null)
  assert.equal(logger.warned.length, 1)
  assert.match(logger.warned[0]!, /checkout will retry it/)

  const product = await kysely
    .selectFrom('paymentProduct')
    .select(['id', 'stripeProductId'])
    .where('id', '=', result!.id)
    .executeTakeFirstOrThrow()
  assert.equal(product.stripeProductId, null)
})

test('saving against an unknown product id is refused rather than silently creating one', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely, { replies: catalogueReplies })

  await assert.rejects(
    () => saveProduct.func(services, { ...kettle, id: 'nope' }, {} as any),
    /Unknown product/
  )
})

test('adding a variant to an existing product keeps the first one', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely, { replies: catalogueReplies })
  const first = await saveProduct.func(services, kettle, {} as any)

  const second = await saveProduct.func(
    services,
    {
      ...kettle,
      id: first!.id,
      variants: [
        { id: first!.variantIds[0], name: 'Standard', amountMinor: 2500, currency: 'eur' },
        { name: 'Large', amountMinor: 3500, currency: 'eur' },
      ],
    },
    {} as any
  )

  assert.equal(second!.variantIds.length, 2)
  assert.equal(second!.variantIds[0], first!.variantIds[0])

  const variants = await kysely
    .selectFrom('paymentVariant')
    .select(['name', 'position'])
    .where('productId', '=', first!.id)
    .orderBy('position', 'asc')
    .execute()
  assert.deepEqual(variants.map((v) => v.name), ['Standard', 'Large'])
})

test('listProducts hides archived products and variants by default', async () => {
  const kysely = createTestDb()
  const { productId, variantId } = await seedProduct(kysely)
  const { services } = createServices(kysely)

  await kysely.updateTable('paymentVariant').set({ active: 0 }).where('id', '=', variantId).execute()
  const hidden = await listProducts.func(services, {}, {} as any)
  assert.equal(hidden?.products[0]!.variants.length, 0)

  const shown = await listProducts.func(services, { includeInactive: true }, {} as any)
  assert.equal(shown?.products[0]!.variants.length, 1)

  await kysely.updateTable('paymentProduct').set({ active: 0 }).where('id', '=', productId).execute()
  const none = await listProducts.func(services, {}, {} as any)
  assert.equal(none?.products.length, 0)
})

test('listProducts reports stock exhaustion but not untracked stock', async () => {
  const kysely = createTestDb()
  await seedProduct(kysely, { stock: 0 })
  const { services } = createServices(kysely)

  const soldOut = await listProducts.func(services, {}, {} as any)
  assert.equal(soldOut?.products[0]!.variants[0]!.inStock, false)
  assert.equal(soldOut?.products[0]!.variants[0]!.stock, 0)

  const other = createTestDb()
  await seedProduct(other, { stock: null })
  const untracked = await listProducts.func(createServices(other).services, {}, {} as any)
  assert.equal(untracked?.products[0]!.variants[0]!.inStock, true)
  assert.equal(untracked?.products[0]!.variants[0]!.stock, null)
})

test('listProducts returns nothing rather than querying variants for an empty catalogue', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely)
  const result = await listProducts.func(services, {}, {} as any)
  assert.deepEqual(result, { products: [] })
})

test('listProducts pages', async () => {
  const kysely = createTestDb()
  await seedProduct(kysely)
  await seedProduct(kysely)
  const { services } = createServices(kysely)

  const page = await listProducts.func(services, { limit: 1, offset: 1 }, {} as any)
  assert.equal(page?.products.length, 1)
})

test('archiving deactivates the product, its variants and the Stripe mirror', async () => {
  const kysely = createTestDb()
  const { productId, variantId } = await seedProduct(kysely)
  const { services, posts } = createServices(kysely)

  const result = await archiveProduct.func(services, { id: productId }, {} as any)

  assert.deepEqual(result, { id: productId, active: false })
  assert.deepEqual(posts[0]!.path, '/products/prod_test')
  assert.deepEqual(posts[0]!.body, { active: false })

  const product = await kysely
    .selectFrom('paymentProduct')
    .select(['active'])
    .where('id', '=', productId)
    .executeTakeFirstOrThrow()
  const variant = await kysely
    .selectFrom('paymentVariant')
    .select(['active'])
    .where('id', '=', variantId)
    .executeTakeFirstOrThrow()
  assert.equal(product.active, 0)
  assert.equal(variant.active, 0)
})

test('archiving is local-first — a Stripe refusal is warned, not thrown', async () => {
  const kysely = createTestDb()
  const { productId } = await seedProduct(kysely)
  const { services, logger } = createServices(kysely, { fail: '/products' })

  await archiveProduct.func(services, { id: productId }, {} as any)

  assert.match(logger.warned[0]!, /archived locally but Stripe refused/)
  const product = await kysely
    .selectFrom('paymentProduct')
    .select(['active'])
    .where('id', '=', productId)
    .executeTakeFirstOrThrow()
  assert.equal(product.active, 0)
})

test('archiving an unmirrored product calls Stripe not at all', async () => {
  const kysely = createTestDb()
  const { productId } = await seedProduct(kysely)
  await kysely
    .updateTable('paymentProduct')
    .set({ stripeProductId: null })
    .where('id', '=', productId)
    .execute()
  const { services, posts } = createServices(kysely)

  await archiveProduct.func(services, { id: productId }, {} as any)
  assert.equal(posts.length, 0)
})

test('archiving an unknown product is refused', async () => {
  const kysely = createTestDb()
  const { services } = createServices(kysely)
  await assert.rejects(
    () => archiveProduct.func(services, { id: 'nope' }, {} as any),
    /Unknown product/
  )
})
