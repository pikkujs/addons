import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CompanyDeleteInput = z.object({
  companyId: z.string(),
})

export const CompanyDeleteOutput = z.record(z.string(), z.unknown())

export const companyDelete = pikkuSessionlessFunc({
  description: "Delete a company",
  input: CompanyDeleteInput,
  output: CompanyDeleteOutput,
  func: async ({ agileCrm }, data) => {
    return agileCrm.call("DELETE", "/api/contacts/company/{companyId}", data) as any
  },
})
