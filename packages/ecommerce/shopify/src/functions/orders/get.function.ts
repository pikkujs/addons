import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { ShopifyOrderSchema } from '../../schemas.js'

export const GetOrderInput = z.object({
  orderId: z.string().describe('Order ID'),
})

export const GetOrderOutput = z.object({
  order: ShopifyOrderSchema,
})

type Output = z.infer<typeof GetOrderOutput>

export const getOrder = pikkuSessionlessFunc({
  description: 'Get an order by ID',
  node: { displayName: 'Get Order', category: 'Ecommerce', type: 'action' },
  input: GetOrderInput,
  output: GetOrderOutput,
  func: async ({ shopify }, { orderId }) => {
    const result = await shopify.getOrder(orderId)
    return { order: result.order }
  },
})
