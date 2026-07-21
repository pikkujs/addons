import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AccountAddNoteInput = z.object({
  title: z.string().optional(),
  body: z.string().optional(),
})

export const AccountAddNoteOutput = z.record(z.string(), z.unknown())

export const accountAddNote = pikkuSessionlessFunc({
  description: "Add note to account",
  input: AccountAddNoteInput,
  output: AccountAddNoteOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("POST", "/sobjects/Account/notes", data) as any
  },
})
