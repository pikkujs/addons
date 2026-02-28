import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { ShopifyOrderSchema, ShopifyAddressSchema } from '../../schemas.js'

export const CreateOrderInput = z.object({
  lineItems: z.array(z.object({
    variantId: z.number().optional().describe('Product variant ID'),
    title: z.string().optional().describe('Line item title'),
    quantity: z.number().describe('Quantity'),
    price: z.string().optional().describe('Price per item'),
  })),
  email: z.string().optional().describe('Customer email'),
  financialStatus: z.enum(['pending', 'authorized', 'partially_paid', 'paid', 'partially_refunded', 'refunded', 'voided']).optional().describe('Financial status'),
  fulfillmentStatus: z.enum(['fulfilled', 'partial', 'restocked']).optional().describe('Fulfillment status'),
  shippingAddress: ShopifyAddressSchema.optional().describe('Shipping address'),
  billingAddress: ShopifyAddressSchema.optional().describe('Billing address'),
  note: z.string().optional().describe('Order note'),
  tags: z.string().optional().describe('Comma-separated tags'),
  currency: z.string().optional().describe('Currency code (e.g., USD)'),
})

export const CreateOrderOutput = z.object({
  order: ShopifyOrderSchema,
})

export const createOrder = pikkuSessionlessFunc({
  description: 'Create a new order',
  node: { displayName: 'Create Order', category: 'Ecommerce', type: 'action' },
  input: CreateOrderInput,
  output: CreateOrderOutput,
  func: async ({ shopify }, { lineItems, email, financialStatus, fulfillmentStatus, shippingAddress, billingAddress, note, tags, currency }) => {
    const result = await shopify.createOrder({
      line_items: lineItems.map(li => ({
        variant_id: li.variantId,
        title: li.title,
        quantity: li.quantity,
        price: li.price,
      })),
      email,
      financial_status: financialStatus,
      fulfillment_status: fulfillmentStatus,
      shipping_address: shippingAddress,
      billing_address: billingAddress,
      note,
      tags,
      currency,
    })
    return { order: result.order }
  },
})
