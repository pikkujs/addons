import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EstimateGetAllInput = z.object({
  companyId: z.string(),
  query: z.string().optional(),
})

export const EstimateGetAllOutput = z.record(z.string(), z.unknown())

export const estimateGetAll = pikkuSessionlessFunc({
  description: "Estimate get all",
  input: EstimateGetAllInput,
  output: EstimateGetAllOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("GET", "/company/{companyId}/estimate", data) as any
  },
})
