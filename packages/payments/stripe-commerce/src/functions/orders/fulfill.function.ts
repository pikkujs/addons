import { z } from 'zod'
import { pikkuFunc } from '#pikku/addon/function'
import { BadRequestError, NotFoundError } from '@pikku/core/errors'

export const FulfillOrderInput = z.object({
  id: z.string().describe('The order to mark as shipped'),
  trackingNumber: z.string().optional().describe('Carrier tracking number, shown to the customer'),
  trackingUrl: z.string().optional().describe('Carrier tracking page for this shipment'),
})

export const FulfillOrderOutput = z.object({
  id: z.string(),
  fulfillmentStatus: z.string(),
  shippedAt: z.string(),
})

/**
 * Fulfilment is deliberately a manual step rather than something the webhook
 * infers: paying for a parcel is not the same as posting it, and a shop needs
 * the unfulfilled queue to be a true picking list.
 */
export const fulfillOrder = pikkuFunc({
  description: 'Mark a paid order as shipped, recording tracking details',
  node: { displayName: 'Fulfil Order', category: 'Orders', type: 'action' },
  input: FulfillOrderInput,
  output: FulfillOrderOutput,
  tags: ['addon'],
  func: async ({ kysely }, data) => {
    const order = await kysely
      .selectFrom('paymentOrder')
      .select(['id', 'status', 'fulfillmentStatus'])
      .where('id', '=', data.id)
      .executeTakeFirst()
    if (!order) {
      throw new NotFoundError(`Unknown order ${data.id}`)
    }
    if (order.status !== 'paid') {
      throw new BadRequestError(`Order ${data.id} is ${order.status}, not paid`)
    }
    if (order.fulfillmentStatus === 'not_required') {
      throw new BadRequestError(`Order ${data.id} contains nothing that ships`)
    }
    if (order.fulfillmentStatus === 'fulfilled') {
      throw new BadRequestError(`Order ${data.id} has already shipped`)
    }

    const now = new Date().toISOString()
    await kysely
      .updateTable('paymentOrder')
      .set({
        fulfillmentStatus: 'fulfilled',
        trackingNumber: data.trackingNumber ?? null,
        trackingUrl: data.trackingUrl ?? null,
        shippedAt: now,
        updatedAt: now,
      })
      .where('id', '=', data.id)
      .execute()

    return { id: data.id, fulfillmentStatus: 'fulfilled', shippedAt: now }
  },
})
