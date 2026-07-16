import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LeadCreateInput = z.object({
  campaignId: z.string(),
  email: z.string(),
  deduplicate: z.boolean().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  companyName: z.string().optional(),
  companyDomain: z.string().optional(),
  jobTitle: z.string().optional(),
  phone: z.string().optional(),
  linkedinUrl: z.string().optional(),
})

export const LeadCreateOutput = z.record(z.string(), z.unknown())

export const leadCreate = pikkuSessionlessFunc({
  description: "Add a lead to a campaign",
  input: LeadCreateInput,
  output: LeadCreateOutput,
  func: async ({ lemlist }, data) => {
    return lemlist.call("POST", "/campaigns/{campaignId}/leads/{email}", data) as any
  },
})
