import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CompanyCreateInput = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  starValue: z.string().optional(),
})

export const CompanyCreateOutput = z.record(z.string(), z.unknown())

export const companyCreate = pikkuSessionlessFunc({
  description: "Create a company",
  input: CompanyCreateInput,
  output: CompanyCreateOutput,
  func: async ({ agileCrm }, data) => {
    return agileCrm.call("POST", "/api/contacts/company", data) as any
  },
})
