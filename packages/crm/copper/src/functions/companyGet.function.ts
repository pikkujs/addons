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
  func: async ({ copper }, data) => {
    return copper.call("GET", "/companies/{companyId}", data) as any
  },
})
