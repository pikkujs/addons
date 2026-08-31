import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const GetOrderInput = z.object({
  id: z.string().describe('The order id returned by checkout'),
})

export const GetOrderOutput = z.object({
  id: z.string(),
  email: z.string().nullable(),
  amountMinor: z.number(),
  amountRefundedMinor: z.number(),
  currency: z.string(),
  status: z.string(),
  fulfillmentStatus: z.string(),
  disputeStatus: z.string().nullable().describe("Set once a chargeback is raised; 'open' until Stripe closes it"),
  shipping: z
    .object({
      name: z.string().nullable(),
      line1: z.string().nullable(),
      line2: z.string().nullable(),
      city: z.string().nullable(),
      state: z.string().nullable(),
      postalCode: z.string().nullable(),
      country: z.string().nullable(),
    })
    .nullable()
    .describe('Null for an order that needs no shipping, or before the customer has paid'),
  trackingNumber: z.string().nullable(),
  trackingUrl: z.string().nullable(),
  shippedAt: z.string().nullable(),
  items: z.array(
    z.object({
      name: z.string(),
      sku: z.string().nullable(),
      quantity: z.number(),
      unitAmountMinor: z.number(),
      lineAmountMinor: z.number(),
      currency: z.string(),
      requiresShipping: z.boolean(),
    })
  ),
  createdAt: z.string(),
})

export const getOrder = pikkuSessionlessFunc({
  description: 'Fetch one order with its line items and shipping address',
  node: { displayName: 'Get Order', category: 'Orders', type: 'action' },
  input: GetOrderInput,
  output: GetOrderOutput,
  tags: ['addon'],
  func: async ({ kysely }, data) => {
    const order = await kysely
      .selectFrom('paymentOrder')
      .selectAll()
      .where('id', '=', data.id)
      .executeTakeFirst()
    if (!order) {
      throw new NotFoundError(`Unknown order ${data.id}`)
    }

    const items = await kysely
      .selectFrom('paymentOrderItem')
      .selectAll()
      .where('orderId', '=', data.id)
      .execute()

    return {
      id: order.id,
      email: order.email,
      amountMinor: order.amountMinor,
      amountRefundedMinor: order.amountRefundedMinor,
      currency: order.currency,
      status: order.status,
      fulfillmentStatus: order.fulfillmentStatus,
      disputeStatus: order.disputeStatus,
      shipping: order.shippingLine1
        ? {
            name: order.shippingName,
            line1: order.shippingLine1,
            line2: order.shippingLine2,
            city: order.shippingCity,
            state: order.shippingState,
            postalCode: order.shippingPostalCode,
            country: order.shippingCountry,
          }
        : null,
      trackingNumber: order.trackingNumber,
      trackingUrl: order.trackingUrl,
      shippedAt: order.shippedAt,
      items: items.map((item) => ({
        name: item.name,
        sku: item.sku,
        quantity: item.quantity,
        unitAmountMinor: item.unitAmountMinor,
        lineAmountMinor: item.unitAmountMinor * item.quantity,
        currency: item.currency,
        requiresShipping: item.requiresShipping === 1,
      })),
      createdAt: order.createdAt,
    }
  },
})
