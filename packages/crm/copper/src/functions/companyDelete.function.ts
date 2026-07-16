import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CompanyDeleteInput = z.object({
  companyId: z.string(),
})

export const CompanyDeleteOutput = z.record(z.string(), z.unknown())

export const companyDelete = pikkuSessionlessFunc({
  description: "Delete a company",
  input: CompanyDeleteInput,
  output: CompanyDeleteOutput,
  func: async ({ copper }, data) => {
    return copper.call("DELETE", "/companies/{companyId}", data) as any
  },
})
