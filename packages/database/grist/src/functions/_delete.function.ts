import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const _deleteInput = z.object({
  docId: z.string(),
  tableId: z.string(),
  body: z.array(z.number().int()),
})

export const _deleteOutput = z.object({
  success: z.boolean().optional(),
})

export const _delete = pikkuSessionlessFunc({
  description: "Delete rows from a table",
  input: _deleteInput,
  output: _deleteOutput,
  func: async ({ grist }, data) => {
    return grist.call("POST", "/docs/{docId}/tables/{tableId}/data/delete", data) as any
  },
})
