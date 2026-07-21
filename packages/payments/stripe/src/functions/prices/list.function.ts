import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ListParamsSchema, PriceSchema, listSchema } from '../../stripe.types.js'
import { toStripeParams, fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const PriceListInput = z.object({
  product: z.string().optional().describe('Only return prices for the given product ID'),
  active: z.boolean().optional().describe('Only return prices that are active or inactive'),
  ...ListParamsSchema,
})

export const PriceListOutput = listSchema(PriceSchema)

export const priceList = pikkuSessionlessFunc({
  description: 'Returns a list of your prices, optionally filtered by product',
  node: { displayName: 'List Prices', category: 'Prices', type: 'action' },
  input: PriceListInput,
  output: PriceListOutput,
  func: async ({ stripe }, data) => {
    const result = await stripe.prices.list(toStripeParams(data))
    return PriceListOutput.parse({
      object: result.object,
      hasMore: result.has_more,
      url: result.url,
      data: result.data.map((price) => ({
        ...fromStripeObject(price),
        created: epochToIso(price.created),
      })),
    })
  },
})
