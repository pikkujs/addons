import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EstimateUpdateInput = z.object({
  companyId: z.string(),
  Id: z.string().optional(),
  SyncToken: z.string().optional(),
  CustomerRef: z.string().optional(),
})

export const EstimateUpdateOutput = z.record(z.string(), z.unknown())

export const estimateUpdate = pikkuSessionlessFunc({
  description: "Estimate update",
  input: EstimateUpdateInput,
  output: EstimateUpdateOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("POST", "/company/{companyId}/estimate/update", data) as any
  },
})
