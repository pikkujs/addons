import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EstimateGetAllOutput = z.record(z.string(), z.unknown())

export const estimateGetAll = pikkuSessionlessFunc({
  description: "Estimate get all",
  output: EstimateGetAllOutput,
  func: async ({ harvest }) => {
    return harvest.call("GET", "/estimates") as any
  },
})
