import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ListParamsSchema, PriceSchema, listSchema } from '../../stripe.types.js'

export const PriceListInput = z.object({
  product: z.string().optional().describe('Only return prices for the given product ID'),
  active: z.boolean().optional().describe('Only return prices that are active or inactive'),
  ...ListParamsSchema,
})

export const PriceListOutput = listSchema(PriceSchema)

type Input = z.infer<typeof PriceListInput>
type Output = z.infer<typeof PriceListOutput>

export const priceList = pikkuSessionlessFunc({
  description: 'Returns a list of your prices, optionally filtered by product',
  node: { displayName: 'List Prices', category: 'Prices', type: 'action' },
  input: PriceListInput,
  output: PriceListOutput,
  func: async ({ stripe }, data) => {
    return await stripe.prices.list(data as Input) as unknown as Output
  },
})
