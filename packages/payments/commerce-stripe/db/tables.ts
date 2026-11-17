import { defineTables } from '@pikku/core/db'

/**
 * The tables this addon ships, published to consumers by `pikku db export`.
 *
 * Money is an integer in the currency's minor unit — never a float, and never
 * assumed to be 1/100, since JPY and KRW are zero-decimal and KWD is three.
 * Booleans are integer 0/1 and timestamps are ISO-8601 text, so the same
 * columns read the same on SQLite, Postgres and MySQL.
 *
 * `stripe_account` is the Stripe account a row belongs to; '' is the default
 * account.
 */
export const tables = defineTables({
  paymentCustomer: {
    columns: {
      id: { type: 'key', primaryKey: true },
      ownerType: { type: 'text' },
      ownerId: { type: 'text' },
      stripeCustomerId: { type: 'text', required: true, security: 'pii' },
      email: {
        type: 'text',
        security: 'pii',
        format: 'email',
        classification: 'fake:email',
      },
      stripeAccount: { type: 'text', required: true, default: '' },
      createdAt: { type: 'text', required: true },
    },
    indexes: [
      {
        columns: ['stripeCustomerId'],
        unique: true,
        name: 'payment_customer_stripe_id_unique',
      },
      {
        columns: ['ownerType', 'ownerId', 'stripeAccount'],
        unique: true,
        name: 'payment_customer_owner_unique',
      },
      { columns: ['email'], name: 'payment_customer_email' },
    ],
  },
  paymentProduct: {
    columns: {
      id: { type: 'key', primaryKey: true },
      slug: { type: 'text', required: true },
      name: { type: 'text', required: true },
      description: { type: 'text' },
      imageUrl: { type: 'text' },
      requiresShipping: { type: 'integer', required: true, default: 1 },
      active: { type: 'integer', required: true, default: 1 },
      stripeProductId: { type: 'text' },
      metadata: { type: 'text' },
      createdAt: { type: 'text', required: true },
      updatedAt: { type: 'text', required: true },
    },
    indexes: [
      { columns: ['slug'], unique: true, name: 'payment_product_slug_unique' },
      { columns: ['active'], name: 'payment_product_active' },
    ],
  },
  paymentVariant: {
    columns: {
      id: { type: 'key', primaryKey: true },
      productId: { type: 'key', required: true },
      name: { type: 'text', required: true },
      sku: { type: 'text' },
      amountMinor: { type: 'integer', required: true },
      currency: { type: 'text', required: true },
      stock: { type: 'integer' },
      position: { type: 'integer', required: true, default: 0 },
      active: { type: 'integer', required: true, default: 1 },
      stripePriceId: { type: 'text' },
      createdAt: { type: 'text', required: true },
      updatedAt: { type: 'text', required: true },
    },
    indexes: [
      { columns: ['productId'], name: 'payment_variant_product_id' },
      { columns: ['sku'], unique: true, name: 'payment_variant_sku_unique' },
    ],
  },
  paymentShippingRate: {
    columns: {
      id: { type: 'key', primaryKey: true },
      name: { type: 'text', required: true },
      amountMinor: { type: 'integer', required: true },
      currency: { type: 'text', required: true },
      deliveryMinDays: { type: 'integer' },
      deliveryMaxDays: { type: 'integer' },
      position: { type: 'integer', required: true, default: 0 },
      active: { type: 'integer', required: true, default: 1 },
      stripeShippingRateId: { type: 'text' },
      createdAt: { type: 'text', required: true },
      updatedAt: { type: 'text', required: true },
    },
    indexes: [{ columns: ['active'], name: 'payment_shipping_rate_active' }],
  },
  paymentCart: {
    columns: {
      id: { type: 'key', primaryKey: true },
      token: {
        type: 'text',
        required: true,
        security: 'secret',
        form: 'plain',
      },
      ownerType: { type: 'text' },
      ownerId: { type: 'text' },
      email: {
        type: 'text',
        security: 'pii',
        format: 'email',
        classification: 'fake:email',
      },
      status: {
        type: 'text',
        required: true,
        enum: ['open', 'converted', 'abandoned'],
      },
      stripeAccount: { type: 'text', required: true, default: '' },
      createdAt: { type: 'text', required: true },
      updatedAt: { type: 'text', required: true },
    },
    indexes: [
      { columns: ['token'], unique: true, name: 'payment_cart_token_unique' },
      { columns: ['ownerType', 'ownerId'], name: 'payment_cart_owner' },
    ],
  },
  paymentCartItem: {
    columns: {
      id: { type: 'key', primaryKey: true },
      cartId: { type: 'key', required: true },
      variantId: { type: 'key', required: true },
      quantity: { type: 'integer', required: true },
      createdAt: { type: 'text', required: true },
      updatedAt: { type: 'text', required: true },
    },
    indexes: [
      {
        columns: ['cartId', 'variantId'],
        unique: true,
        name: 'payment_cart_item_unique',
      },
    ],
  },
  paymentOrder: {
    columns: {
      id: { type: 'key', primaryKey: true },
      customerId: { type: 'key' },
      cartId: { type: 'key' },
      email: {
        type: 'text',
        security: 'pii',
        format: 'email',
        classification: 'fake:email',
      },
      stripeAccount: { type: 'text', required: true, default: '' },
      stripeCheckoutSessionId: { type: 'text', security: 'pii' },
      stripePaymentIntentId: { type: 'text', security: 'pii' },
      amountMinor: { type: 'integer', required: true },
      amountRefundedMinor: { type: 'integer', required: true, default: 0 },
      currency: { type: 'text', required: true },
      status: {
        type: 'text',
        required: true,
        enum: [
          'pending',
          'authorized',
          'processing',
          'paid',
          'failed',
          'expired',
          'refunded',
        ],
      },
      captureMethod: {
        type: 'text',
        required: true,
        default: 'automatic',
        enum: ['automatic', 'manual'],
      },
      amountCapturedMinor: { type: 'integer' },
      fulfillmentStatus: {
        type: 'text',
        required: true,
        default: 'not_required',
        enum: ['not_required', 'unfulfilled', 'fulfilled'],
      },
      shippingName: {
        type: 'text',
        security: 'pii',
        classification: 'fake:name',
      },
      shippingLine1: { type: 'text', security: 'pii' },
      shippingLine2: { type: 'text', security: 'pii' },
      shippingCity: { type: 'text', security: 'pii' },
      shippingState: { type: 'text', security: 'pii' },
      shippingPostalCode: { type: 'text', security: 'pii' },
      shippingCountry: { type: 'text', security: 'pii' },
      disputeStatus: { type: 'text', enum: ['open', 'won', 'lost'] },
      trackingNumber: { type: 'text', security: 'pii' },
      trackingUrl: { type: 'text', security: 'pii' },
      shippedAt: { type: 'text' },
      metadata: { type: 'text' },
      createdAt: { type: 'text', required: true },
      updatedAt: { type: 'text', required: true },
    },
    indexes: [
      {
        columns: ['stripeCheckoutSessionId'],
        unique: true,
        name: 'payment_order_session_unique',
      },
      { columns: ['customerId'], name: 'payment_order_customer_id' },
      { columns: ['status'], name: 'payment_order_status' },
      {
        columns: ['fulfillmentStatus'],
        name: 'payment_order_fulfillment_status',
      },
    ],
  },
  paymentOrderItem: {
    columns: {
      id: { type: 'key', primaryKey: true },
      orderId: { type: 'key', required: true },
      variantId: { type: 'key' },
      name: { type: 'text', required: true },
      sku: { type: 'text' },
      quantity: { type: 'integer', required: true },
      unitAmountMinor: { type: 'integer', required: true },
      currency: { type: 'text', required: true },
      requiresShipping: { type: 'integer', required: true, default: 0 },
    },
    indexes: [
      { columns: ['orderId'], name: 'payment_order_item_order_id' },
      { columns: ['variantId'], name: 'payment_order_item_variant_id' },
    ],
  },
  paymentRefund: {
    columns: {
      id: { type: 'key', primaryKey: true },
      orderId: { type: 'key', required: true },
      amountMinor: { type: 'integer', required: true },
      reason: { type: 'text' },
      createdAt: { type: 'text', required: true },
    },
    indexes: [{ columns: ['orderId'], name: 'payment_refund_order_id' }],
  },
  paymentWebhookEvent: {
    columns: {
      id: { type: 'key', primaryKey: true },
      type: { type: 'text', required: true },
      status: { type: 'text', required: true },
      receivedAt: { type: 'text', required: true },
    },
    indexes: [{ columns: ['type'], name: 'payment_webhook_event_type' }],
  },
})
