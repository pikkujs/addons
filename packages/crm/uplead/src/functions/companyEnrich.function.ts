import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CompanyEnrichInput = z.object({
  q: z.string().optional(),
})

export const CompanyEnrichOutput = z.record(z.string(), z.unknown())

export const companyEnrich = pikkuSessionlessFunc({
  description: "Company enrich",
  input: CompanyEnrichInput,
  output: CompanyEnrichOutput,
  func: async ({ uplead }, data) => {
    return uplead.call("GET", "/company-search", data) as any
  },
})
