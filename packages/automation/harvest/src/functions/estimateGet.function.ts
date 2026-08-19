import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EstimateGetInput = z.object({
  id: z.string(),
})

export const EstimateGetOutput = z.record(z.string(), z.unknown())

export const estimateGet = pikkuSessionlessFunc({
  description: "Estimate get",
  input: EstimateGetInput,
  output: EstimateGetOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("GET", "/estimates/{id}", data) as any
  },
})
