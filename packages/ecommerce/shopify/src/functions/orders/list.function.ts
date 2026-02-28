import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { ShopifyOrderSchema } from '../../schemas.js'

export const ListOrdersInput = z.object({
  limit: z.number().optional().describe('Maximum number of orders to return'),
  status: z.string().optional().describe('Filter by status (open, closed, cancelled, any)'),
  sinceId: z.string().optional().describe('Return orders after this ID'),
})

export const ListOrdersOutput = z.object({
  orders: z.array(ShopifyOrderSchema),
})

type Output = z.infer<typeof ListOrdersOutput>

export const listOrders = pikkuSessionlessFunc({
  description: 'List all orders',
  node: { displayName: 'List Orders', category: 'Ecommerce', type: 'action' },
  input: ListOrdersInput,
  output: ListOrdersOutput,
  func: async ({ shopify }, { limit, status, sinceId }) => {
    const result = await shopify.listOrders({
      limit,
      status,
      since_id: sinceId,
    })
    return { orders: result.orders }
  },
})
