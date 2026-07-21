import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const NoteGetAllInput = z.object({
  limit: z.number().int().optional(),
  filter: z.record(z.string(), z.unknown()).optional(),
})

export const NoteGetAllOutput = z.record(z.string(), z.unknown())

export const noteGetAll = pikkuSessionlessFunc({
  description: "GetAll note",
  input: NoteGetAllInput,
  output: NoteGetAllOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/note/getAll", data) as any
  },
})
