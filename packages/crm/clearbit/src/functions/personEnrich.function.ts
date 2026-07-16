import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PersonEnrichInput = z.object({
  email: z.string(),
  given_name: z.string().optional(),
  family_name: z.string().optional(),
  ip_address: z.string().optional(),
  location: z.string().optional(),
  company: z.string().optional(),
  company_domain: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  facebook: z.string().optional(),
})

export const PersonEnrichOutput = z.record(z.string(), z.unknown())

export const personEnrich = pikkuSessionlessFunc({
  description: "Enrich a person",
  input: PersonEnrichInput,
  output: PersonEnrichOutput,
  func: async ({ clearbit }, data) => {
    return clearbit.call("GET", "/v2/people/find", data) as any
  },
})
