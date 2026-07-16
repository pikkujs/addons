import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteRowsInput = z.object({
  body: z.string().optional(),
})

export const DeleteRowsOutput = z.record(z.string(), z.unknown())

export const deleteRows = pikkuSessionlessFunc({
  description: "Delete rows",
  input: DeleteRowsInput,
  output: DeleteRowsOutput,
  func: async ({ microsoftSql }, data) => {
    return microsoftSql.call("POST", "/delete", data) as any
  },
})
