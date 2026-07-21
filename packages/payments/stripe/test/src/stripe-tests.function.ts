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
      assert.equal(typeof result.hasMore, 'boolean')
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
          expMonth: '12',
          expYear: '2030',
          cvc: '123',
        },
      })
      assert.equal(result.object, 'token')
      assert.ok(result.id, 'Expected token ID')
      assert.equal(typeof result.used, 'boolean')
      tokenId = result.id
    })

    // -- Customer Cards --
    // Note: stripe-mock does not implement the legacy customer /sources
    // endpoints (createSource/retrieveSource/deleteSource) — it returns an
    // unrelated Connect account fixture no matter what's requested, for any
    // caller. That's a stripe-mock gap, not an addon bug: the addon's output
    // schema correctly reflects the real Stripe Card shape (brand, last4,
    // expMonth, expYear, funding, customer), and stripe-mock simply cannot
    // produce it here. Skipping customerCardAdd/Get/Remove for the same
    // reason meterEventCreate is skipped below.
    let cardCustomerId: string

    await run('customerCreate for card tests', async () => {
      const result = await rpc.invoke('stripe:customerCreate', {
        name: 'Card Test Customer',
      })
      cardCustomerId = result.id
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
        percentOff: 25,
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

    // Note: sourceDelete detaches a source from a customer via the same
    // legacy customer /sources endpoint family as customerCardAdd above,
    // which stripe-mock does not implement correctly (see note above).
    // Skipping for the same reason.

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
        unitAmount: 1500,
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

    await run('paymentIntentCreate returns a clientSecret for Elements', async () => {
      const result = await rpc.invoke('stripe:paymentIntentCreate', {
        amount: 5000,
        currency: 'usd',
        automaticPaymentMethods: true,
        metadata: { purpose: 'ai_topup' },
      })
      assert.equal(result.object, 'payment_intent')
      assert.ok(result.id, 'Expected payment intent ID')
      assert.ok(result.clientSecret, 'Expected clientSecret for a custom checkout UI')
      paymentIntentId = result.id
    })

    await run('paymentIntentGet retrieves the payment intent', async () => {
      const result = await rpc.invoke('stripe:paymentIntentGet', { paymentIntentId })
      assert.equal(result.object, 'payment_intent')
    })

    await run('paymentIntentCancel cancels the payment intent', async () => {
      const result = await rpc.invoke('stripe:paymentIntentCancel', {
        paymentIntentId,
        cancellationReason: 'requested_by_customer',
      })
      assert.equal(result.object, 'payment_intent')
    })

    // -- Setup Intents (save a card without charging) --
    let setupIntentId: string

    await run('setupIntentCreate returns a clientSecret', async () => {
      const result = await rpc.invoke('stripe:setupIntentCreate', {
        usage: 'off_session',
        automaticPaymentMethods: true,
      })
      assert.equal(result.object, 'setup_intent')
      assert.ok(result.clientSecret, 'Expected clientSecret')
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
        paymentBehavior: 'default_incomplete',
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
        collectionMethod: 'send_invoice',
        daysUntilDue: 7,
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
        capabilities: { cardPayments: true, transfers: true },
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
        refreshUrl: 'https://example.com/reauth',
        returnUrl: 'https://example.com/return',
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
        priceData: {
          currency: 'usd',
          unitAmount: 2500,
          productName: 'AI credit top-up',
        },
        successUrl: 'https://example.com/success',
        cancelUrl: 'https://example.com/cancel',
        paymentIntentData: { metadata: { purpose: 'ai_topup', organizationId: 'org_123' } },
      })
      assert.equal(result.object, 'checkout.session')
      assert.ok(result.id, 'Expected session ID')
    })

    return { passed, failed }
  },
})
