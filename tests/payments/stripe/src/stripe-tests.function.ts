import assert from 'node:assert/strict'
import { pikkuSessionlessFunc } from '#pikku'

export type TestStripeInput = {}
export type TestStripeOutput = { passed: number; failed: string[] }

export const testStripe = pikkuSessionlessFunc<TestStripeInput, TestStripeOutput>({
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

    // -- Balance --
    await run('balanceGet retrieves account balance', async () => {
      const result = await rpc.invoke('stripe:balanceGet', {})
      assert.equal(result.object, 'balance')
      assert.ok(Array.isArray(result.available), 'Expected available to be an array')
      assert.ok(Array.isArray(result.pending), 'Expected pending to be an array')
      assert.equal(typeof result.livemode, 'boolean')
    })

    // -- Customers CRUD --
    let customerId: string

    await run('customerCreate creates a customer', async () => {
      const result = await rpc.invoke('stripe:customerCreate', {
        name: 'Pikku Test Customer',
        email: 'pikku-test@example.com',
        description: 'Created by Pikku test harness',
        metadata: { test: 'true' },
      })
      assert.equal(result.object, 'customer')
      assert.ok(result.id, 'Expected customer ID')
      customerId = result.id
    })

    await run('customerGet retrieves the customer', async () => {
      const result = await rpc.invoke('stripe:customerGet', { customerId })
      assert.ok(result.id, 'Expected customer ID')
      assert.equal(result.object, 'customer')
    })

    await run('customerUpdate updates the customer', async () => {
      const result = await rpc.invoke('stripe:customerUpdate', {
        customerId,
        name: 'Pikku Updated Customer',
        metadata: { test: 'true', updated: 'true' },
      })
      assert.ok(result.id, 'Expected customer ID')
      assert.equal(result.object, 'customer')
    })

    await run('customerList returns customers', async () => {
      const result = await rpc.invoke('stripe:customerList', { limit: 3 })
      assert.equal(result.object, 'list')
      assert.ok(Array.isArray(result.data), 'Expected data to be an array')
      assert.equal(typeof result.has_more, 'boolean')
    })

    await run('customerDelete deletes the customer', async () => {
      const result = await rpc.invoke('stripe:customerDelete', { customerId })
      assert.ok(result.id, 'Expected customer ID')
      assert.equal(result.deleted, true)
    })

    // -- Tokens --
    let tokenId: string

    await run('tokenCreate creates a card token', async () => {
      const result = await rpc.invoke('stripe:tokenCreate', {
        card: {
          number: '4242424242424242',
          exp_month: '12',
          exp_year: '2030',
          cvc: '123',
        },
      })
      assert.equal(result.object, 'token')
      assert.ok(result.id, 'Expected token ID')
      assert.equal(typeof result.used, 'boolean')
      tokenId = result.id
    })

    // -- Customer Cards --
    // Create a fresh customer for card tests
    let cardCustomerId: string
    let cardId: string

    await run('customerCreate for card tests', async () => {
      const result = await rpc.invoke('stripe:customerCreate', {
        name: 'Card Test Customer',
      })
      cardCustomerId = result.id
    })

    await run('customerCardAdd adds a card to the customer', async () => {
      const result = await rpc.invoke('stripe:customerCardAdd', {
        customerId: cardCustomerId,
        source: tokenId,
      })
      assert.ok(result.id, 'Expected card ID')
      cardId = result.id
    })

    await run('customerCardGet retrieves the card', async () => {
      const result = await rpc.invoke('stripe:customerCardGet', {
        customerId: cardCustomerId,
        cardId,
      })
      assert.ok(result.id, 'Expected card ID')
    })

    await run('customerCardRemove removes the card', async () => {
      const result = await rpc.invoke('stripe:customerCardRemove', {
        customerId: cardCustomerId,
        cardId,
      })
      assert.ok(result.id, 'Expected card ID')
    })

    // Cleanup card test customer
    await rpc.invoke('stripe:customerDelete', { customerId: cardCustomerId })

    // -- Charges --
    let chargeId: string

    await run('chargeCreate creates a charge', async () => {
      const result = await rpc.invoke('stripe:chargeCreate', {
        amount: 2000,
        currency: 'usd',
        source: 'tok_visa',
        description: 'Pikku test charge',
        metadata: { test: 'true' },
      })
      assert.equal(result.object, 'charge')
      assert.ok(result.id, 'Expected charge ID')
      chargeId = result.id
    })

    await run('chargeGet retrieves the charge', async () => {
      const result = await rpc.invoke('stripe:chargeGet', { chargeId })
      assert.ok(result.id, 'Expected charge ID')
      assert.equal(result.object, 'charge')
    })

    await run('chargeUpdate updates the charge', async () => {
      const result = await rpc.invoke('stripe:chargeUpdate', {
        chargeId,
        description: 'Updated Pikku test charge',
        metadata: { test: 'true', updated: 'true' },
      })
      assert.ok(result.id, 'Expected charge ID')
      assert.equal(result.object, 'charge')
    })

    await run('chargeList returns charges', async () => {
      const result = await rpc.invoke('stripe:chargeList', { limit: 3 })
      assert.equal(result.object, 'list')
      assert.ok(Array.isArray(result.data), 'Expected data to be an array')
    })

    // -- Coupons --
    await run('couponCreate creates a coupon', async () => {
      const result = await rpc.invoke('stripe:couponCreate', {
        percent_off: 25,
        duration: 'once',
        name: 'Pikku Test Coupon',
        metadata: { test: 'true' },
      })
      assert.equal(result.object, 'coupon')
      assert.ok(result.id, 'Expected coupon ID')
    })

    await run('couponList returns coupons', async () => {
      const result = await rpc.invoke('stripe:couponList', { limit: 3 })
      assert.equal(result.object, 'list')
      assert.ok(Array.isArray(result.data), 'Expected data to be an array')
    })

    // -- Sources --
    let sourceId: string

    await run('sourceCreate creates a source', async () => {
      const result = await rpc.invoke('stripe:sourceCreate', {
        type: 'ach_credit_transfer',
        currency: 'usd',
      })
      assert.equal(result.object, 'source')
      assert.ok(result.id, 'Expected source ID')
      sourceId = result.id
    })

    await run('sourceGet retrieves the source', async () => {
      const result = await rpc.invoke('stripe:sourceGet', { sourceId })
      assert.equal(result.id, sourceId)
      assert.equal(result.object, 'source')
    })

    // sourceDelete requires a source attached to a customer
    let sourceCustomerId: string

    await run('sourceDelete detaches source from customer', async () => {
      const cust = await rpc.invoke('stripe:customerCreate', { name: 'Source Test' })
      sourceCustomerId = cust.id

      // Create a new token and add as source, then delete
      const tok = await rpc.invoke('stripe:tokenCreate', {
        card: { number: '4242424242424242', exp_month: '12', exp_year: '2030', cvc: '999' },
      })
      const card = await rpc.invoke('stripe:customerCardAdd', {
        customerId: sourceCustomerId,
        source: tok.id,
      })
      const result = await rpc.invoke('stripe:sourceDelete', {
        customerId: sourceCustomerId,
        sourceId: card.id,
      })
      assert.ok(result.id, 'Expected deleted source ID')

      // Cleanup
      await rpc.invoke('stripe:customerDelete', { customerId: sourceCustomerId })
    })

    // -- Meter Events --
    // Note: stripe-mock may not fully support billing meter events
    // Skipping meterEventCreate as it requires a pre-configured meter

    return { passed, failed }
  },
})
