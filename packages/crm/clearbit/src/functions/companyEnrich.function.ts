import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CompanyEnrichInput = z.object({
  domain: z.string(),
  company_name: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  facebook: z.string().optional(),
})

export const CompanyEnrichOutput = z.record(z.string(), z.unknown())

export const companyEnrich = pikkuSessionlessFunc({
  description: "Enrich a company",
  input: CompanyEnrichInput,
  output: CompanyEnrichOutput,
  func: async ({ clearbit }, data) => {
    return clearbit.call("GET", "/v2/companies/find", data) as any
  },
})
