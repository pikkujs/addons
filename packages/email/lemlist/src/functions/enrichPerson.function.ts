import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EnrichPersonInput = z.object({
  findEmail: z.boolean().optional(),
  verifyEmail: z.boolean().optional(),
  linkedinEnrichment: z.boolean().optional(),
  findPhone: z.boolean().optional(),
  email: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  linkedinUrl: z.string().optional(),
  companyName: z.string().optional(),
  companyDomain: z.string().optional(),
})

export const EnrichPersonOutput = z.record(z.string(), z.unknown())

export const enrichPerson = pikkuSessionlessFunc({
  description: "Enrich a person using an email or LinkedIn URL",
  input: EnrichPersonInput,
  output: EnrichPersonOutput,
  func: async ({ lemlist }, data) => {
    return lemlist.call("POST", "/enrich", data) as any
  },
})
