import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyOrderSchema } from '../../schemas.js'

export const UpdateOrderInput = z.object({
  orderId: z.number().describe('Order ID'),
  statusId: z.number().optional().describe('Status ID'),
  ownerId: z.number().optional().describe('Owner ID'),
  properties: z
    .array(z.record(z.string(), z.unknown()))
    .optional()
    .describe('Order properties'),
})

export const UpdateOrderOutput = z.object({
  order: PlentyOrderSchema,
})

type Output = z.infer<typeof UpdateOrderOutput>

export const updateOrder = pikkuSessionlessFunc({
  description: 'Update an existing order',
  node: {
    displayName: 'Update Order',
    category: 'Ecommerce',
    type: 'action',
  },
  input: UpdateOrderInput,
  output: UpdateOrderOutput,
  func: async ({ plentymarkets }, input) => {
    const { orderId, ...body } = input
    const order = await plentymarkets.updateOrder(orderId, body)
    return { order }
  },
})
