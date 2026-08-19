import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactAddNoteInput = z.object({
  title: z.string().optional(),
  body: z.string().optional(),
})

export const ContactAddNoteOutput = z.record(z.string(), z.unknown())

export const contactAddNote = pikkuSessionlessFunc({
  description: "Add note to contact",
  input: ContactAddNoteInput,
  output: ContactAddNoteOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("POST", "/sobjects/Contact/notes", data) as any
  },
})
