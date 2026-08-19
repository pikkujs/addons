import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CompanyCreateInput = z.object({
  company_name: z.string().optional(),
  website: z.string().optional(),
  notes: z.string().optional(),
})

export const CompanyCreateOutput = z.record(z.string(), z.unknown())

export const companyCreate = pikkuSessionlessFunc({
  description: "Create a company",
  input: CompanyCreateInput,
  output: CompanyCreateOutput,
  func: async ({ keap }, data) => {
    return keap.call("POST", "/companies", data) as any
  },
})
