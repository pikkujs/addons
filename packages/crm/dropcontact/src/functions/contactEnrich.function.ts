import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactEnrichInput = z.object({
  data: z.array(z.object({
  email: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  full_name: z.string().optional(),
  company: z.string().optional(),
  website: z.string().optional(),
  linkedin: z.string().optional(),
  phone: z.string().optional(),
  country: z.string().optional(),
  num_siren: z.string().optional(),
  siret: z.string().optional(),
})).optional(),
  siren: z.boolean().optional(),
  language: z.string().optional(),
})

export const ContactEnrichOutput = z.object({
  success: z.boolean().optional(),
  request_id: z.string().optional(),
  reason: z.string().optional(),
})

export const contactEnrich = pikkuSessionlessFunc({
  description: "Find B2B emails and enrich contacts",
  input: ContactEnrichInput,
  output: ContactEnrichOutput,
  func: async ({ dropcontact }, data) => {
    return dropcontact.call("POST", "/batch", data) as any
  },
})
