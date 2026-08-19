import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const NoteDeleteInput = z.object({
  id: z.string().optional().describe("Odoo record ID"),
})

export const NoteDeleteOutput = z.record(z.string(), z.unknown())

export const noteDelete = pikkuSessionlessFunc({
  description: "Delete note",
  input: NoteDeleteInput,
  output: NoteDeleteOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/note/delete", data) as any
  },
})
