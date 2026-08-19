import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const NoteDeleteInput = z.object({
  noteId: z.string(),
})

export const NoteDeleteOutput = z.record(z.string(), z.unknown())

export const noteDelete = pikkuSessionlessFunc({
  description: "Delete a note",
  input: NoteDeleteInput,
  output: NoteDeleteOutput,
  func: async ({ keap }, data) => {
    return keap.call("DELETE", "/notes/{noteId}", data) as any
  },
})
