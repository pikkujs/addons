import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const LeadAddNoteInput = z.object({
  title: z.string().optional(),
  body: z.string().optional(),
})

export const LeadAddNoteOutput = z.record(z.string(), z.unknown())

export const leadAddNote = pikkuSessionlessFunc({
  description: "Add note to lead",
  input: LeadAddNoteInput,
  output: LeadAddNoteOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("POST", "/sobjects/Lead/notes", data) as any
  },
})
