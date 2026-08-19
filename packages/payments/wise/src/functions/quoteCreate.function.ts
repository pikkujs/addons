import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const QuoteCreateInput = z.object({
  profile: z.string().optional(),
  sourceCurrency: z.string().optional(),
  targetCurrency: z.string().optional(),
  sourceAmount: z.number().optional(),
  targetAmount: z.number().optional(),
})

export const QuoteCreateOutput = z.record(z.string(), z.unknown())

export const quoteCreate = pikkuSessionlessFunc({
  description: "Create a quote",
  input: QuoteCreateInput,
  output: QuoteCreateOutput,
  func: async ({ wise }, data) => {
    return wise.call("POST", "/v2/quotes", data) as any
  },
})
