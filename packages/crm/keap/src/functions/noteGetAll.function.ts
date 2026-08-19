import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const NoteGetAllInput = z.object({
  limit: z.number().int().optional(),
})

export const NoteGetAllOutput = z.record(z.string(), z.unknown())

export const noteGetAll = pikkuSessionlessFunc({
  description: "List notes",
  input: NoteGetAllInput,
  output: NoteGetAllOutput,
  func: async ({ keap }, data) => {
    return keap.call("GET", "/notes", data) as any
  },
})
