import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListDeleteInput = z.object({
  listId: z.string(),
})

export const ListDeleteOutput = z.record(z.string(), z.unknown())

export const listDelete = pikkuSessionlessFunc({
  description: "Delete a list",
  input: ListDeleteInput,
  output: ListDeleteOutput,
  func: async ({ automizy }, data) => {
    return automizy.call("DELETE", "/smart-lists/{listId}", data) as any
  },
})
