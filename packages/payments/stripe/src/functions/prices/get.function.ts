import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { PriceSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const PriceGetInput = z.object({
  priceId: z.string().describe('The identifier of the price to retrieve (price_...)'),
})

export const PriceGetOutput = PriceSchema

export const priceGet = pikkuSessionlessFunc({
  description: 'Retrieve details of an existing price',
  node: { displayName: 'Get Price', category: 'Prices', type: 'action' },
  input: PriceGetInput,
  output: PriceGetOutput,
  func: async ({ stripe }, { priceId }) => {
    const result = await stripe.prices.retrieve(priceId)
    const camel = fromStripeObject(result)
    return PriceGetOutput.parse({ ...camel, created: epochToIso(result.created) })
  },
})
