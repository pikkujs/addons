import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const NoteGetInput = z.object({
  id: z.string().optional().describe("Odoo record ID"),
})

export const NoteGetOutput = z.record(z.string(), z.unknown())

export const noteGet = pikkuSessionlessFunc({
  description: "Get note",
  input: NoteGetInput,
  output: NoteGetOutput,
  func: async ({ odoo }, data) => {
    return odoo.call("POST", "/jsonrpc/note/get", data) as any
  },
})
