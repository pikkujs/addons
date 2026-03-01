import assert from 'node:assert/strict'
import { pikkuSessionlessFunc } from '#pikku'

export type TestPlentymarketsInput = Record<string, never>
export type TestPlentymarketsOutput = { passed: number; failed: string[] }

export const testPlentymarkets = pikkuSessionlessFunc<TestPlentymarketsInput, TestPlentymarketsOutput>({
  func: async (_services, _data, { rpc }) => {
    let passed = 0
    const failed: string[] = []

    const run = async (name: string, fn: () => Promise<void>) => {
      try {
        await fn()
        passed++
      } catch (e: any) {
        failed.push(`${name}: ${e.message}`)
      }
    }

    // ── Orders ─────────────────────────────────────────────

    let createdOrderId: number | undefined

    await run('createOrder creates an order', async () => {
      const r = await rpc.invoke('plentymarkets:createOrder', {
        typeId: 1,
        statusId: 3,
        referrerId: 1,
      })
      assert.ok(r.order, 'Expected order in response')
      assert.ok(r.order.id, 'Expected order to have an id')
      assert.equal(r.order.typeId, 1)
      createdOrderId = r.order.id
    })

    await run('getOrder retrieves an order', async () => {
      assert.ok(createdOrderId, 'Need order from previous test')
      const r = await rpc.invoke('plentymarkets:getOrder', { orderId: createdOrderId })
      assert.ok(r.order, 'Expected order in response')
      assert.equal(r.order.id, createdOrderId)
    })

    await run('listOrders returns paginated orders', async () => {
      const r = await rpc.invoke('plentymarkets:listOrders', { page: 1, itemsPerPage: 25 })
      assert.ok(Array.isArray(r.entries), 'Expected entries array')
      assert.ok(typeof r.page === 'number', 'Expected page number')
      assert.ok(typeof r.totalsCount === 'number', 'Expected totalsCount')
    })

    await run('updateOrder updates an order', async () => {
      assert.ok(createdOrderId, 'Need order from previous test')
      const r = await rpc.invoke('plentymarkets:updateOrder', {
        orderId: createdOrderId,
        statusId: 5,
      })
      assert.ok(r.order, 'Expected order in response')
      assert.equal(r.order.id, createdOrderId)
    })

    // ── Items ──────────────────────────────────────────────

    let createdItemId: number | undefined

    await run('createItem creates an item', async () => {
      const r = await rpc.invoke('plentymarkets:createItem', {
        itemType: 'default',
        stockType: 0,
      })
      assert.ok(r.item, 'Expected item in response')
      assert.ok(r.item.id, 'Expected item to have an id')
      createdItemId = r.item.id
    })

    await run('getItem retrieves an item', async () => {
      assert.ok(createdItemId, 'Need item from previous test')
      const r = await rpc.invoke('plentymarkets:getItem', { itemId: createdItemId })
      assert.ok(r.item, 'Expected item in response')
      assert.equal(r.item.id, createdItemId)
    })

    await run('listItems returns paginated items', async () => {
      const r = await rpc.invoke('plentymarkets:listItems', { page: 1, itemsPerPage: 25 })
      assert.ok(Array.isArray(r.entries), 'Expected entries array')
    })

    await run('updateItem updates an item', async () => {
      assert.ok(createdItemId, 'Need item from previous test')
      const r = await rpc.invoke('plentymarkets:updateItem', {
        itemId: createdItemId,
        stockType: 1,
      })
      assert.ok(r.item, 'Expected item in response')
      assert.equal(r.item.id, createdItemId)
    })

    // ── Variations ─────────────────────────────────────────

    let createdVariationId: number | undefined

    await run('createVariation creates a variation', async () => {
      assert.ok(createdItemId, 'Need item from previous test')
      const r = await rpc.invoke('plentymarkets:createVariation', {
        itemId: createdItemId,
        number: 'VAR-001',
        isMain: true,
        isActive: true,
      })
      assert.ok(r.variation, 'Expected variation in response')
      assert.ok(r.variation.id, 'Expected variation to have an id')
      createdVariationId = r.variation.id
    })

    await run('getVariation retrieves a variation', async () => {
      assert.ok(createdItemId, 'Need item from previous test')
      assert.ok(createdVariationId, 'Need variation from previous test')
      const r = await rpc.invoke('plentymarkets:getVariation', {
        itemId: createdItemId,
        variationId: createdVariationId,
      })
      assert.ok(r.variation, 'Expected variation in response')
      assert.equal(r.variation.id, createdVariationId)
    })

    await run('listVariations returns paginated variations', async () => {
      assert.ok(createdItemId, 'Need item from previous test')
      const r = await rpc.invoke('plentymarkets:listVariations', {
        itemId: createdItemId,
        page: 1,
        itemsPerPage: 25,
      })
      assert.ok(Array.isArray(r.entries), 'Expected entries array')
    })

    await run('updateVariation updates a variation', async () => {
      assert.ok(createdItemId, 'Need item from previous test')
      assert.ok(createdVariationId, 'Need variation from previous test')
      const r = await rpc.invoke('plentymarkets:updateVariation', {
        itemId: createdItemId,
        variationId: createdVariationId,
        isActive: false,
      })
      assert.ok(r.variation, 'Expected variation in response')
      assert.equal(r.variation.id, createdVariationId)
    })

    // ── Categories ─────────────────────────────────────────

    let createdCategoryId: number | undefined

    await run('createCategory creates a category', async () => {
      const r = await rpc.invoke('plentymarkets:createCategory', {
        type: 'item',
        details: [{ lang: 'en', name: 'Test Category' }],
      })
      assert.ok(r.category, 'Expected category in response')
      assert.ok(r.category.id, 'Expected category to have an id')
      createdCategoryId = r.category.id
    })

    await run('getCategory retrieves a category', async () => {
      assert.ok(createdCategoryId, 'Need category from previous test')
      const r = await rpc.invoke('plentymarkets:getCategory', { id: createdCategoryId })
      assert.ok(r.category, 'Expected category in response')
      assert.equal(r.category.id, createdCategoryId)
    })

    await run('listCategories returns paginated categories', async () => {
      const r = await rpc.invoke('plentymarkets:listCategories', { page: 1, itemsPerPage: 25 })
      assert.ok(Array.isArray(r.entries), 'Expected entries array')
    })

    await run('updateCategory updates a category', async () => {
      assert.ok(createdCategoryId, 'Need category from previous test')
      const r = await rpc.invoke('plentymarkets:updateCategory', {
        id: createdCategoryId,
        type: 'blog',
      })
      assert.ok(r.category, 'Expected category in response')
      assert.equal(r.category.id, createdCategoryId)
    })

    await run('deleteCategory deletes a category', async () => {
      assert.ok(createdCategoryId, 'Need category from previous test')
      const r = await rpc.invoke('plentymarkets:deleteCategory', { id: createdCategoryId })
      assert.equal(r.success, true)
    })

    // ── Warehouses ─────────────────────────────────────────

    await run('listWarehouses returns warehouses', async () => {
      const r = await rpc.invoke('plentymarkets:listWarehouses', {})
      assert.ok(Array.isArray(r.warehouses), 'Expected warehouses array')
      assert.ok(r.warehouses.length > 0, 'Expected at least one warehouse')
    })

    await run('getWarehouse retrieves a warehouse', async () => {
      const r = await rpc.invoke('plentymarkets:getWarehouse', { id: 1 })
      assert.ok(r.warehouse, 'Expected warehouse in response')
      assert.equal(r.warehouse.id, 1)
    })

    // ── Stock ──────────────────────────────────────────────

    await run('listStock returns paginated stock', async () => {
      const r = await rpc.invoke('plentymarkets:listStock', { page: 1, itemsPerPage: 25 })
      assert.ok(Array.isArray(r.entries), 'Expected entries array')
    })

    await run('listWarehouseStock returns warehouse stock', async () => {
      const r = await rpc.invoke('plentymarkets:listWarehouseStock', {
        warehouseId: 1,
        page: 1,
        itemsPerPage: 25,
      })
      assert.ok(Array.isArray(r.entries), 'Expected entries array')
    })

    await run('correctStock applies corrections', async () => {
      const r = await rpc.invoke('plentymarkets:correctStock', {
        warehouseId: 1,
        corrections: [
          { variationId: 100, quantity: 10, reasonId: 1 },
        ],
      })
      assert.equal(r.success, true)
    })

    // ── Payments ───────────────────────────────────────────

    let createdPaymentId: number | undefined

    await run('createPayment creates a payment', async () => {
      const r = await rpc.invoke('plentymarkets:createPayment', {
        amount: 99.99,
        currency: 'EUR',
        mopId: 1,
        status: 2,
      })
      assert.ok(r.payment, 'Expected payment in response')
      assert.ok(r.payment.id, 'Expected payment to have an id')
      createdPaymentId = r.payment.id
    })

    await run('getPayment retrieves a payment', async () => {
      assert.ok(createdPaymentId, 'Need payment from previous test')
      const r = await rpc.invoke('plentymarkets:getPayment', { id: createdPaymentId })
      assert.ok(r.payment, 'Expected payment in response')
      assert.equal(r.payment.id, createdPaymentId)
    })

    await run('listPayments returns paginated payments', async () => {
      const r = await rpc.invoke('plentymarkets:listPayments', { page: 1, itemsPerPage: 25 })
      assert.ok(Array.isArray(r.entries), 'Expected entries array')
    })

    // ── Contacts ───────────────────────────────────────────

    let createdContactId: number | undefined

    await run('createContact creates a contact', async () => {
      const r = await rpc.invoke('plentymarkets:createContact', {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        typeId: 1,
      })
      assert.ok(r.contact, 'Expected contact in response')
      assert.ok(r.contact.id, 'Expected contact to have an id')
      createdContactId = r.contact.id
    })

    await run('getContact retrieves a contact', async () => {
      assert.ok(createdContactId, 'Need contact from previous test')
      const r = await rpc.invoke('plentymarkets:getContact', { id: createdContactId })
      assert.ok(r.contact, 'Expected contact in response')
      assert.equal(r.contact.id, createdContactId)
    })

    await run('listContacts returns paginated contacts', async () => {
      const r = await rpc.invoke('plentymarkets:listContacts', { page: 1, itemsPerPage: 25 })
      assert.ok(Array.isArray(r.entries), 'Expected entries array')
    })

    await run('updateContact updates a contact', async () => {
      assert.ok(createdContactId, 'Need contact from previous test')
      const r = await rpc.invoke('plentymarkets:updateContact', {
        id: createdContactId,
        firstName: 'Updated',
      })
      assert.ok(r.contact, 'Expected contact in response')
      assert.equal(r.contact.id, createdContactId)
    })

    return { passed, failed }
  },
})
