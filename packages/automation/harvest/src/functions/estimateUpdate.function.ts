import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EstimateUpdateInput = z.object({
  id: z.string(),
  client_id: z.string().optional(),
})

export const EstimateUpdateOutput = z.record(z.string(), z.unknown())

export const estimateUpdate = pikkuSessionlessFunc({
  description: "Estimate update",
  input: EstimateUpdateInput,
  output: EstimateUpdateOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("PATCH", "/estimates/{id}", data) as any
  },
})
