import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const QuoteGetInput = z.object({
  quoteId: z.string(),
})

export const QuoteGetOutput = z.record(z.string(), z.unknown())

export const quoteGet = pikkuSessionlessFunc({
  description: "Get quote by id",
  input: QuoteGetInput,
  output: QuoteGetOutput,
  func: async ({ wise }, data) => {
    return wise.call("GET", "/v2/quotes/{quoteId}", data) as any
  },
})
