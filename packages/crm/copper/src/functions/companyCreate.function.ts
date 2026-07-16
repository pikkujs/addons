import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CompanyCreateInput = z.object({
  name: z.string().optional(),
  email_domain: z.string().optional(),
  details: z.string().optional(),
})

export const CompanyCreateOutput = z.record(z.string(), z.unknown())

export const companyCreate = pikkuSessionlessFunc({
  description: "Create a company",
  input: CompanyCreateInput,
  output: CompanyCreateOutput,
  func: async ({ copper }, data) => {
    return copper.call("POST", "/companies", data) as any
  },
})
