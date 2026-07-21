import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EstimateDeleteInput = z.object({
  id: z.string(),
})

export const EstimateDeleteOutput = z.record(z.string(), z.unknown())

export const estimateDelete = pikkuSessionlessFunc({
  description: "Estimate delete",
  input: EstimateDeleteInput,
  output: EstimateDeleteOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("DELETE", "/estimates/{id}", data) as any
  },
})
