import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'

export const DeleteOrderInput = z.object({
  orderId: z.string().describe('Order ID'),
})

export const DeleteOrderOutput = z.object({
  success: z.boolean(),
})

export const deleteOrder = pikkuSessionlessFunc({
  description: 'Delete an order',
  node: { displayName: 'Delete Order', category: 'Ecommerce', type: 'action' },
  input: DeleteOrderInput,
  output: DeleteOrderOutput,
  func: async ({ shopify }, { orderId }) => {
    await shopify.deleteOrder(orderId)
    return { success: true }
  },
})
