import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CompanyUpdateInput = z.object({
  companyId: z.string(),
  companyname: z.string().optional(),
  companyemail: z.string().optional(),
})

export const CompanyUpdateOutput = z.record(z.string(), z.unknown())

export const companyUpdate = pikkuSessionlessFunc({
  description: "Update a company",
  input: CompanyUpdateInput,
  output: CompanyUpdateOutput,
  func: async ({ mautic }, data) => {
    return mautic.call("PATCH", "/companies/{companyId}/edit", data) as any
  },
})
