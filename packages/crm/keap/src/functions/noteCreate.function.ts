import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const NoteCreateInput = z.object({
  user_id: z.number().int().optional(),
  contact_id: z.number().int().optional(),
  title: z.string().optional(),
  body: z.string().optional(),
})

export const NoteCreateOutput = z.record(z.string(), z.unknown())

export const noteCreate = pikkuSessionlessFunc({
  description: "Create a note",
  input: NoteCreateInput,
  output: NoteCreateOutput,
  func: async ({ keap }, data) => {
    return keap.call("POST", "/notes", data) as any
  },
})
