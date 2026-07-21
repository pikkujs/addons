import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema, PriceSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const PriceCreateInput = z.object({
  product: z.string().describe('The ID of the product this price belongs to (prod_...)'),
  currency: z.string().describe('Three-letter ISO currency code, lowercase'),
  unitAmount: z.number().describe('A positive integer in the smallest currency unit (e.g. 500 = $5.00)'),
  recurring: z
    .object({
      interval: z.enum(['day', 'week', 'month', 'year']).describe('The frequency at which a subscription is billed'),
      intervalCount: z.number().optional().describe('The number of intervals between subscription billings'),
    })
    .optional()
    .describe('Provide to make this a recurring (subscription) price; omit for a one-time price'),
  active: z.boolean().optional().describe('Whether the price can be used for new purchases. Defaults to true'),
  nickname: z.string().optional().describe('A brief description of the price, hidden from customers'),
  metadata: MetadataSchema.optional().describe('Set of key-value pairs that you can attach to the price'),
})

export const PriceCreateOutput = PriceSchema

export const priceCreate = pikkuSessionlessFunc({
  description: 'Create a price for a product, one-time or recurring',
  node: { displayName: 'Create Price', category: 'Prices', type: 'action' },
  input: PriceCreateInput,
  output: PriceCreateOutput,
  func: async ({ stripe }, data) => {
    const result = await stripe.prices.create({
      product: data.product,
      currency: data.currency,
      unit_amount: data.unitAmount,
      ...(data.recurring
        ? {
            recurring: {
              interval: data.recurring.interval,
              ...(data.recurring.intervalCount !== undefined ? { interval_count: data.recurring.intervalCount } : {}),
            },
          }
        : {}),
      ...(data.active !== undefined ? { active: data.active } : {}),
      ...(data.nickname ? { nickname: data.nickname } : {}),
      ...(data.metadata ? { metadata: data.metadata } : {}),
    })
    const camel = fromStripeObject(result)
    return PriceCreateOutput.parse({ ...camel, created: epochToIso(result.created) })
  },
})
