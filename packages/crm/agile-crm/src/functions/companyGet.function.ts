import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CompanyGetInput = z.object({
  companyId: z.string(),
})

export const CompanyGetOutput = z.record(z.string(), z.unknown())

export const companyGet = pikkuSessionlessFunc({
  description: "Get a company",
  input: CompanyGetInput,
  output: CompanyGetOutput,
  func: async ({ agileCrm }, data) => {
    return agileCrm.call("GET", "/api/contacts/company/{companyId}", data) as any
  },
})
