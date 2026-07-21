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
  func: async ({ mautic }, data) => {
    return mautic.call("DELETE", "/companies/{companyId}/delete", data) as any
  },
})
