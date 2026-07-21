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

    // -- Products --
    let productId: string

    await run('productCreate creates a product', async () => {
      const result = await rpc.invoke('stripe:productCreate', {
        name: 'Pikku Test Product',
        description: 'Created by Pikku test harness',
        metadata: { test: 'true' },
      })
      assert.equal(result.object, 'product')
      assert.ok(result.id, 'Expected product ID')
      productId = result.id
    })

    await run('productGet retrieves the product', async () => {
      const result = await rpc.invoke('stripe:productGet', { productId })
      assert.equal(result.object, 'product')
      assert.ok(result.id, 'Expected product ID')
    })

    await run('productUpdate archives the product', async () => {
      const result = await rpc.invoke('stripe:productUpdate', { productId, active: false })
      assert.equal(result.object, 'product')
    })

    await run('productList returns products', async () => {
      const result = await rpc.invoke('stripe:productList', { limit: 3 })
      assert.equal(result.object, 'list')
      assert.ok(Array.isArray(result.data), 'Expected data to be an array')
    })

    // -- Prices --
    let priceId: string

    await run('priceCreate creates a recurring price', async () => {
      const result = await rpc.invoke('stripe:priceCreate', {
        product: productId,
        currency: 'usd',
        unit_amount: 1500,
        recurring: { interval: 'month' },
      })
      assert.equal(result.object, 'price')
      assert.ok(result.id, 'Expected price ID')
      priceId = result.id
    })

    await run('priceGet retrieves the price', async () => {
      const result = await rpc.invoke('stripe:priceGet', { priceId })
      assert.equal(result.object, 'price')
    })

    await run('priceUpdate archives the price', async () => {
      const result = await rpc.invoke('stripe:priceUpdate', { priceId, active: false })
      assert.equal(result.object, 'price')
    })

    await run('priceList returns prices', async () => {
      const result = await rpc.invoke('stripe:priceList', { limit: 3 })
      assert.equal(result.object, 'list')
      assert.ok(Array.isArray(result.data), 'Expected data to be an array')
    })

    // -- Payment Intents (client-side Elements flow exposes client_secret) --
    let paymentIntentId: string

    await run('paymentIntentCreate returns a client_secret for Elements', async () => {
      const result = await rpc.invoke('stripe:paymentIntentCreate', {
        amount: 5000,
        currency: 'usd',
        automatic_payment_methods: true,
        metadata: { purpose: 'ai_topup' },
      })
      assert.equal(result.object, 'payment_intent')
      assert.ok(result.id, 'Expected payment intent ID')
      assert.ok(result.client_secret, 'Expected client_secret for a custom checkout UI')
      paymentIntentId = result.id
    })

    await run('paymentIntentGet retrieves the payment intent', async () => {
      const result = await rpc.invoke('stripe:paymentIntentGet', { paymentIntentId })
      assert.equal(result.object, 'payment_intent')
    })

    await run('paymentIntentCancel cancels the payment intent', async () => {
      const result = await rpc.invoke('stripe:paymentIntentCancel', {
        paymentIntentId,
        cancellation_reason: 'requested_by_customer',
      })
      assert.equal(result.object, 'payment_intent')
    })

    // -- Setup Intents (save a card without charging) --
    let setupIntentId: string

    await run('setupIntentCreate returns a client_secret', async () => {
      const result = await rpc.invoke('stripe:setupIntentCreate', {
        usage: 'off_session',
        automatic_payment_methods: true,
      })
      assert.equal(result.object, 'setup_intent')
      assert.ok(result.client_secret, 'Expected client_secret')
      setupIntentId = result.id
    })

    await run('setupIntentGet retrieves the setup intent', async () => {
      const result = await rpc.invoke('stripe:setupIntentGet', { setupIntentId })
      assert.equal(result.object, 'setup_intent')
    })

    // -- Refunds --
    let refundId: string

    await run('refundCreate refunds a charge', async () => {
      const result = await rpc.invoke('stripe:refundCreate', {
        charge: chargeId,
        reason: 'requested_by_customer',
        metadata: { test: 'true' },
      })
      assert.equal(result.object, 'refund')
      assert.ok(result.id, 'Expected refund ID')
      refundId = result.id
    })

    await run('refundGet retrieves the refund', async () => {
      const result = await rpc.invoke('stripe:refundGet', { refundId })
      assert.equal(result.object, 'refund')
    })

    await run('refundList returns refunds', async () => {
      const result = await rpc.invoke('stripe:refundList', { limit: 3 })
      assert.equal(result.object, 'list')
      assert.ok(Array.isArray(result.data), 'Expected data to be an array')
    })

    // -- Subscriptions (create) --
    await run('subscriptionCreate creates a subscription', async () => {
      const result = await rpc.invoke('stripe:subscriptionCreate', {
        customer: 'cus_mock',
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        metadata: { test: 'true' },
      })
      assert.equal(result.object, 'subscription')
      assert.ok(result.id, 'Expected subscription ID')
    })

    // -- Invoices --
    let invoiceId: string

    await run('invoiceCreate creates a draft invoice', async () => {
      const result = await rpc.invoke('stripe:invoiceCreate', {
        customer: 'cus_mock',
        collection_method: 'send_invoice',
        days_until_due: 7,
      })
      assert.equal(result.object, 'invoice')
      assert.ok(result.id, 'Expected invoice ID')
      invoiceId = result.id
    })

    await run('invoiceItemCreate adds a line item', async () => {
      const result = await rpc.invoke('stripe:invoiceItemCreate', {
        customer: 'cus_mock',
        amount: 2500,
        currency: 'usd',
        description: 'Pikku test line item',
      })
      assert.equal(result.object, 'invoiceitem')
      assert.ok(result.id, 'Expected invoice item ID')
    })

    await run('invoiceGet retrieves the invoice', async () => {
      const result = await rpc.invoke('stripe:invoiceGet', { invoiceId })
      assert.equal(result.object, 'invoice')
    })

    await run('invoiceList returns invoices', async () => {
      const result = await rpc.invoke('stripe:invoiceList', { limit: 3 })
      assert.equal(result.object, 'list')
      assert.ok(Array.isArray(result.data), 'Expected data to be an array')
    })

    // -- Connect (marketplaces) --
    let connectedAccountId: string

    await run('accountCreate creates a connected account', async () => {
      const result = await rpc.invoke('stripe:accountCreate', {
        type: 'express',
        email: 'seller@example.com',
        capabilities: { card_payments: true, transfers: true },
      })
      assert.equal(result.object, 'account')
      assert.ok(result.id, 'Expected account ID')
      connectedAccountId = result.id
    })

    await run('accountGet retrieves the connected account', async () => {
      const result = await rpc.invoke('stripe:accountGet', { accountId: connectedAccountId })
      assert.equal(result.object, 'account')
    })

    await run('accountLinkCreate returns an onboarding url', async () => {
      const result = await rpc.invoke('stripe:accountLinkCreate', {
        account: connectedAccountId,
        refresh_url: 'https://example.com/reauth',
        return_url: 'https://example.com/return',
      })
      assert.equal(result.object, 'account_link')
      assert.ok(result.url, 'Expected onboarding url')
    })

    await run('transferCreate transfers to a connected account', async () => {
      const result = await rpc.invoke('stripe:transferCreate', {
        amount: 1000,
        currency: 'usd',
        destination: connectedAccountId,
      })
      assert.equal(result.object, 'transfer')
      assert.ok(result.id, 'Expected transfer ID')
    })

    await run('payoutCreate creates a payout', async () => {
      const result = await rpc.invoke('stripe:payoutCreate', {
        amount: 1000,
        currency: 'usd',
      })
      assert.equal(result.object, 'payout')
      assert.ok(result.id, 'Expected payout ID')
    })

    // -- Checkout with inline price_data + payment_intent_data (wallet top-up) --
    await run('checkoutSessionCreate supports inline price_data + payment_intent_data', async () => {
      const result = await rpc.invoke('stripe:checkoutSessionCreate', {
        mode: 'payment',
        price_data: {
          currency: 'usd',
          unit_amount: 2500,
          product_name: 'AI credit top-up',
        },
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
        payment_intent_data: { metadata: { purpose: 'ai_topup', organizationId: 'org_123' } },
      })
      assert.equal(result.object, 'checkout.session')
      assert.ok(result.id, 'Expected session ID')
    })

    return { passed, failed }
  },
})
