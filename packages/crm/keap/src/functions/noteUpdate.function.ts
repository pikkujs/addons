import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const NoteUpdateInput = z.object({
  noteId: z.string(),
  title: z.string().optional(),
  body: z.string().optional(),
})

export const NoteUpdateOutput = z.record(z.string(), z.unknown())

export const noteUpdate = pikkuSessionlessFunc({
  description: "Update a note",
  input: NoteUpdateInput,
  output: NoteUpdateOutput,
  func: async ({ keap }, data) => {
    return keap.call("PATCH", "/notes/{noteId}", data) as any
  },
})
