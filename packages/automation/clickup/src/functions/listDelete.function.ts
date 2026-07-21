import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListDeleteInput = z.object({
  listId: z.string(),
})

export const ListDeleteOutput = z.record(z.string(), z.unknown())

export const listDelete = pikkuSessionlessFunc({
  description: "List delete",
  input: ListDeleteInput,
  output: ListDeleteOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("DELETE", "/list/{listId}", data) as any
  },
})
