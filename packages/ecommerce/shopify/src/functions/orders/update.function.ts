import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { ShopifyOrderSchema } from '../../schemas.js'

export const UpdateOrderInput = z.object({
  orderId: z.string().describe('Order ID'),
  note: z.string().optional().describe('Order note'),
  tags: z.string().optional().describe('Comma-separated tags'),
  email: z.string().optional().describe('Customer email'),
})

export const UpdateOrderOutput = z.object({
  order: ShopifyOrderSchema,
})

type Output = z.infer<typeof UpdateOrderOutput>

export const updateOrder = pikkuSessionlessFunc({
  description: 'Update an existing order',
  node: { displayName: 'Update Order', category: 'Ecommerce', type: 'action' },
  input: UpdateOrderInput,
  output: UpdateOrderOutput,
  func: async ({ shopify }, { orderId, note, tags, email }) => {
    const result = await shopify.updateOrder(orderId, { note, tags, email })
    return { order: result.order }
  },
})
