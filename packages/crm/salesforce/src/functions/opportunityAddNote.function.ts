import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OpportunityAddNoteInput = z.object({
  title: z.string().optional(),
  body: z.string().optional(),
})

export const OpportunityAddNoteOutput = z.record(z.string(), z.unknown())

export const opportunityAddNote = pikkuSessionlessFunc({
  description: "Add note to opportunity",
  input: OpportunityAddNoteInput,
  output: OpportunityAddNoteOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("POST", "/sobjects/Opportunity/notes", data) as any
  },
})
