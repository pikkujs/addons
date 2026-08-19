import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EstimateCreateInput = z.object({
  companyId: z.string(),
  CustomerRef: z.string().optional(),
})

export const EstimateCreateOutput = z.record(z.string(), z.unknown())

export const estimateCreate = pikkuSessionlessFunc({
  description: "Estimate create",
  input: EstimateCreateInput,
  output: EstimateCreateOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("POST", "/company/{companyId}/estimate", data) as any
  },
})
