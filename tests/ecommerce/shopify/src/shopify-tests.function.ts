import assert from 'node:assert/strict'
import { pikkuSessionlessFunc } from '#pikku'

export type TestShopifyInput = {}
export type TestShopifyOutput = { passed: number; failed: string[] }

export const testShopify = pikkuSessionlessFunc<TestShopifyInput, TestShopifyOutput>({
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

    // -- Products CRUD --
    let productId: string

    await run('createProduct creates a product', async () => {
      const result = await rpc.invoke('shopify:createProduct', {
        title: 'Pikku Test Product',
        bodyHtml: '<p>Created by Pikku test harness</p>',
        vendor: 'Pikku',
        productType: 'Test',
        status: 'draft',
        tags: 'pikku,test',
      })
      assert.ok(result.product, 'Expected product in response')
      assert.ok(result.product.id, 'Expected product ID')
      assert.equal(result.product.title, 'Pikku Test Product')
      productId = String(result.product.id)
    })

    await run('getProduct retrieves the product', async () => {
      const result = await rpc.invoke('shopify:getProduct', { productId })
      assert.ok(result.product, 'Expected product in response')
      assert.equal(String(result.product.id), productId)
    })

    await run('updateProduct updates the product', async () => {
      const result = await rpc.invoke('shopify:updateProduct', {
        productId,
        title: 'Pikku Updated Product',
        tags: 'pikku,test,updated',
      })
      assert.ok(result.product, 'Expected product in response')
      assert.equal(result.product.title, 'Pikku Updated Product')
    })

    await run('listProducts returns products', async () => {
      const result = await rpc.invoke('shopify:listProducts', { limit: 5 })
      assert.ok(Array.isArray(result.products), 'Expected products array')
    })

    await run('deleteProduct deletes the product', async () => {
      const result = await rpc.invoke('shopify:deleteProduct', { productId })
      assert.equal(result.success, true)
    })

    // -- Customers CRUD --
    let customerId: string
    const testEmail = `pikku-test-${Date.now()}@example.com`

    await run('createCustomer creates a customer', async () => {
      const result = await rpc.invoke('shopify:createCustomer', {
        email: testEmail,
        firstName: 'Pikku',
        lastName: 'Test',
        tags: 'pikku,test',
        note: 'Created by Pikku test harness',
      })
      assert.ok(result.customer, 'Expected customer in response')
      assert.ok(result.customer.id, 'Expected customer ID')
      customerId = String(result.customer.id)
    })

    await run('getCustomer retrieves the customer', async () => {
      const result = await rpc.invoke('shopify:getCustomer', { customerId })
      assert.ok(result.customer, 'Expected customer in response')
      assert.equal(String(result.customer.id), customerId)
    })

    await run('updateCustomer updates the customer', async () => {
      const result = await rpc.invoke('shopify:updateCustomer', {
        customerId,
        firstName: 'PikkuUpdated',
        tags: 'pikku,test,updated',
      })
      assert.ok(result.customer, 'Expected customer in response')
    })

    await run('listCustomers returns customers', async () => {
      const result = await rpc.invoke('shopify:listCustomers', { limit: 5 })
      assert.ok(Array.isArray(result.customers), 'Expected customers array')
    })

    await run('deleteCustomer deletes the customer', async () => {
      const result = await rpc.invoke('shopify:deleteCustomer', { customerId })
      assert.equal(result.success, true)
    })

    // -- Orders CRUD --
    let orderId: string

    await run('createOrder creates an order', async () => {
      const result = await rpc.invoke('shopify:createOrder', {
        lineItems: [{
          title: 'Pikku Test Item',
          quantity: 1,
          price: '10.00',
        }],
        email: 'pikku-order-test@example.com',
        financialStatus: 'pending',
        tags: 'pikku,test',
        note: 'Created by Pikku test harness',
      })
      assert.ok(result.order, 'Expected order in response')
      assert.ok(result.order.id, 'Expected order ID')
      orderId = String(result.order.id)
    })

    await run('getOrder retrieves the order', async () => {
      const result = await rpc.invoke('shopify:getOrder', { orderId })
      assert.ok(result.order, 'Expected order in response')
      assert.equal(String(result.order.id), orderId)
    })

    await run('updateOrder updates the order', async () => {
      const result = await rpc.invoke('shopify:updateOrder', {
        orderId,
        note: 'Updated by Pikku test harness',
        tags: 'pikku,test,updated',
      })
      assert.ok(result.order, 'Expected order in response')
    })

    await run('listOrders returns orders', async () => {
      const result = await rpc.invoke('shopify:listOrders', { limit: 5 })
      assert.ok(Array.isArray(result.orders), 'Expected orders array')
    })

    await run('cancelOrder cancels the order', async () => {
      const result = await rpc.invoke('shopify:cancelOrder', {
        orderId,
        reason: 'Pikku test cleanup',
      })
      assert.ok(result.order, 'Expected order in response')
    })

    await run('deleteOrder deletes the order', async () => {
      const result = await rpc.invoke('shopify:deleteOrder', { orderId })
      assert.equal(result.success, true)
    })

    // -- Inventory --
    // Note: adjustInventory requires real inventory_item_id and location_id
    // which depend on existing products with variants, so we skip it here
    // unless running against a fully seeded store

    return { passed, failed }
  },
})
