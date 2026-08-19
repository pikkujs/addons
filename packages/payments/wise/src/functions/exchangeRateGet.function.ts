import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ExchangeRateGetInput = z.object({
  source: z.string(),
  target: z.string(),
  from: z.string().optional(),
  to: z.string().optional(),
})

export const ExchangeRateGetOutput = z.record(z.string(), z.unknown())

export const exchangeRateGet = pikkuSessionlessFunc({
  description: "Get exchange rates",
  input: ExchangeRateGetInput,
  output: ExchangeRateGetOutput,
  func: async ({ wise }, data) => {
    return wise.call("GET", "/v1/rates", data) as any
  },
})
