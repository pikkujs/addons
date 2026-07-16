import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CompanyCreateInput = z.object({
  companyname: z.string().optional(),
  companyemail: z.string().optional(),
  companywebsite: z.string().optional(),
})

export const CompanyCreateOutput = z.record(z.string(), z.unknown())

export const companyCreate = pikkuSessionlessFunc({
  description: "Create a company",
  input: CompanyCreateInput,
  output: CompanyCreateOutput,
  func: async ({ mautic }, data) => {
    return mautic.call("POST", "/companies/new", data) as any
  },
})
