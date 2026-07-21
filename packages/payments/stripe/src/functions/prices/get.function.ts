import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { PriceSchema } from '../../stripe.types.js'

export const PriceGetInput = z.object({
  priceId: z.string().describe('The identifier of the price to retrieve (price_...)'),
})

export const PriceGetOutput = PriceSchema

type Output = z.infer<typeof PriceGetOutput>

export const priceGet = pikkuSessionlessFunc({
  description: 'Retrieve details of an existing price',
  node: { displayName: 'Get Price', category: 'Prices', type: 'action' },
  input: PriceGetInput,
  output: PriceGetOutput,
  func: async ({ stripe }, { priceId }) => {
    return await stripe.prices.retrieve(priceId) as unknown as Output
  },
})
