import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const NoteGetInput = z.object({
  noteId: z.string(),
})

export const NoteGetOutput = z.record(z.string(), z.unknown())

export const noteGet = pikkuSessionlessFunc({
  description: "Get a note",
  input: NoteGetInput,
  output: NoteGetOutput,
  func: async ({ keap }, data) => {
    return keap.call("GET", "/notes/{noteId}", data) as any
  },
})
