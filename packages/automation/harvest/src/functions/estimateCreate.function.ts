import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EstimateCreateInput = z.object({
  client_id: z.string().optional(),
})

export const EstimateCreateOutput = z.record(z.string(), z.unknown())

export const estimateCreate = pikkuSessionlessFunc({
  description: "Estimate create",
  input: EstimateCreateInput,
  output: EstimateCreateOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("POST", "/estimates", data) as any
  },
})
