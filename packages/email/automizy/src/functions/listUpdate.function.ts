import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListUpdateInput = z.object({
  listId: z.string(),
  name: z.string().optional(),
})

export const ListUpdateOutput = z.record(z.string(), z.unknown())

export const listUpdate = pikkuSessionlessFunc({
  description: "Update a list",
  input: ListUpdateInput,
  output: ListUpdateOutput,
  func: async ({ automizy }, data) => {
    return automizy.call("PATCH", "/smart-lists/{listId}", data) as any
  },
})
