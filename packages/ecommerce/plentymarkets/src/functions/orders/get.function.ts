import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyOrderSchema } from '../../schemas.js'

export const GetOrderInput = z.object({
  orderId: z.number().describe('Order ID'),
})

export const GetOrderOutput = z.object({
  order: PlentyOrderSchema,
})

type Output = z.infer<typeof GetOrderOutput>

export const getOrder = pikkuSessionlessFunc({
  description: 'Get an order by ID',
  node: { displayName: 'Get Order', category: 'Ecommerce', type: 'action' },
  input: GetOrderInput,
  output: GetOrderOutput,
  func: async ({ plentymarkets }, { orderId }) => {
    const order = await plentymarkets.getOrder(orderId)
    return { order }
  },
})
