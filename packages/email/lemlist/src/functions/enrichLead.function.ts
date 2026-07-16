import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EnrichLeadInput = z.object({
  leadId: z.string(),
  findEmail: z.boolean().optional(),
  verifyEmail: z.boolean().optional(),
  linkedinEnrichment: z.boolean().optional(),
  findPhone: z.boolean().optional(),
})

export const EnrichLeadOutput = z.record(z.string(), z.unknown())

export const enrichLead = pikkuSessionlessFunc({
  description: "Enrich a lead using an email or LinkedIn URL",
  input: EnrichLeadInput,
  output: EnrichLeadOutput,
  func: async ({ lemlist }, data) => {
    return lemlist.call("POST", "/leads/{leadId}/enrich", data) as any
  },
})
