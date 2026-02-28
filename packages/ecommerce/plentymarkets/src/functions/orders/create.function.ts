import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyOrderSchema } from '../../schemas.js'

export const CreateOrderInput = z.object({
  typeId: z.number().describe('Order type ID'),
  referrerId: z.number().optional().describe('Referrer ID'),
  statusId: z.number().optional().describe('Status ID'),
  ownerId: z.number().optional().describe('Owner ID'),
  plentyId: z.number().optional().describe('Plenty ID'),
  locationId: z.number().optional().describe('Location ID'),
  orderItems: z
    .array(z.record(z.string(), z.unknown()))
    .optional()
    .describe('Order items'),
  properties: z
    .array(z.record(z.string(), z.unknown()))
    .optional()
    .describe('Order properties'),
  addressRelations: z
    .array(z.record(z.string(), z.unknown()))
    .optional()
    .describe('Address relations'),
})

export const CreateOrderOutput = z.object({
  order: PlentyOrderSchema,
})

type Output = z.infer<typeof CreateOrderOutput>

export const createOrder = pikkuSessionlessFunc({
  description: 'Create a new order',
  node: {
    displayName: 'Create Order',
    category: 'Ecommerce',
    type: 'action',
  },
  input: CreateOrderInput,
  output: CreateOrderOutput,
  func: async (
    { plentymarkets },
    {
      typeId,
      referrerId,
      statusId,
      ownerId,
      plentyId,
      locationId,
      orderItems,
      properties,
      addressRelations,
    }
  ) => {
    const order = await plentymarkets.createOrder({
      typeId,
      referrerId,
      statusId,
      ownerId,
      plentyId,
      locationId,
      orderItems,
      properties,
      addressRelations,
    })
    return { order }
  },
})
