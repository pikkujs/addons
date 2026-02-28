import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { ShopifyOrderSchema } from '../../schemas.js'

export const CancelOrderInput = z.object({
  orderId: z.string().describe('Order ID'),
  reason: z.string().optional().describe('Cancellation reason'),
})

export const CancelOrderOutput = z.object({
  order: ShopifyOrderSchema,
})

type Output = z.infer<typeof CancelOrderOutput>

export const cancelOrder = pikkuSessionlessFunc({
  description: 'Cancel an order',
  node: { displayName: 'Cancel Order', category: 'Ecommerce', type: 'action' },
  input: CancelOrderInput,
  output: CancelOrderOutput,
  func: async ({ shopify }, { orderId, reason }) => {
    const result = await shopify.cancelOrder(orderId, reason)
    return { order: result.order }
  },
})
