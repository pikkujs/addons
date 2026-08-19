import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CompanyUpdateInput = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
})

export const CompanyUpdateOutput = z.record(z.string(), z.unknown())

export const companyUpdate = pikkuSessionlessFunc({
  description: "Update a company",
  input: CompanyUpdateInput,
  output: CompanyUpdateOutput,
  func: async ({ agileCrm }, data) => {
    return agileCrm.call("PUT", "/api/contacts/company/edit-properties", data) as any
  },
})
