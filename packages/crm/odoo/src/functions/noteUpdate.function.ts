import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const NoteUpdateInput = z.object({
  id: z.string().optional().describe("Odoo record ID"),
  memo: z.string().optional(),
})

export const NoteUpdateOutput = z.record(z.string(), z.unknown())

export const noteUpdate = pikkuSessionlessFunc({
  description: "Update note",
  input: NoteUpdateInput,
  output: NoteUpdateOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/note/update", data) as any
  },
})
