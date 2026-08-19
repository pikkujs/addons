import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EstimateGetInput = z.object({
  companyId: z.string(),
  id: z.string(),
})

export const EstimateGetOutput = z.record(z.string(), z.unknown())

export const estimateGet = pikkuSessionlessFunc({
  description: "Estimate get",
  input: EstimateGetInput,
  output: EstimateGetOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("GET", "/company/{companyId}/estimate/{id}", data) as any
  },
})
