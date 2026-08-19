import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DealGetAllInput = z.object({
  page_size: z.number().optional(),
})

export const DealGetAllOutput = z.record(z.string(), z.unknown())

export const dealGetAll = pikkuSessionlessFunc({
  description: "Get many deals",
  input: DealGetAllInput,
  output: DealGetAllOutput,
  func: async ({ agileCrm }, data) => {
    return agileCrm.call("GET", "/api/opportunity", data) as any
  },
})
