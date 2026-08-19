import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const NoteCreateInput = z.object({
  memo: z.string().optional(),
})

export const NoteCreateOutput = z.record(z.string(), z.unknown())

export const noteCreate = pikkuSessionlessFunc({
  description: "Create note",
  input: NoteCreateInput,
  output: NoteCreateOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/note/create", data) as any
  },
})
