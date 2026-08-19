import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CompanyGetInput = z.object({
  companyId: z.string(),
})

export const CompanyGetOutput = z.record(z.string(), z.unknown())

export const companyGet = pikkuSessionlessFunc({
  description: "Get a company",
  input: CompanyGetInput,
  output: CompanyGetOutput,
  func: async ({ mautic }, data) => {
    return mautic.call("GET", "/companies/{companyId}", data) as any
  },
})
