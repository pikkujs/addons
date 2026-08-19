import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CompanyUpdateInput = z.object({
  companyId: z.string(),
  name: z.string().optional(),
  email_domain: z.string().optional(),
  details: z.string().optional(),
})

export const CompanyUpdateOutput = z.record(z.string(), z.unknown())

export const companyUpdate = pikkuSessionlessFunc({
  description: "Update a company",
  input: CompanyUpdateInput,
  output: CompanyUpdateOutput,
  func: async ({ copper }, data) => {
    return copper.call("PUT", "/companies/{companyId}", data) as any
  },
})
