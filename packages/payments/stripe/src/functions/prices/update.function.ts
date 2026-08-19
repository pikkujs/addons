import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { MetadataSchema, PriceSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const PriceUpdateInput = z.object({
  priceId: z.string().describe('The identifier of the price to update (price_...)'),
  active: z.boolean().optional().describe('Whether the price can be used for new purchases. Set false to archive it (existing subscriptions keep billing)'),
  nickname: z.string().optional().describe('A brief description of the price, hidden from customers'),
  metadata: MetadataSchema.optional().describe('Set of key-value pairs that you can attach to the price'),
})

export const PriceUpdateOutput = PriceSchema

export const priceUpdate = pikkuSessionlessFunc({
  description: 'Update an existing price. The amount and currency are immutable — archive and recreate to change them',
  node: { displayName: 'Update Price', category: 'Prices', type: 'action' },
  input: PriceUpdateInput,
  output: PriceUpdateOutput,
  func: async ({ stripe }, { priceId, ...data }) => {
    const result = await stripe.prices.update(priceId, {
      ...(data.active !== undefined ? { active: data.active } : {}),
      ...(data.nickname ? { nickname: data.nickname } : {}),
      ...(data.metadata ? { metadata: data.metadata } : {}),
    })
    const camel = fromStripeObject(result)
    return PriceUpdateOutput.parse({ ...camel, created: epochToIso(result.created) })
  },
})
