import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListUpdateInput = z.object({
  listId: z.string(),
  name: z.string().optional(),
  content: z.string().optional(),
})

export const ListUpdateOutput = z.record(z.string(), z.unknown())

export const listUpdate = pikkuSessionlessFunc({
  description: "List update",
  input: ListUpdateInput,
  output: ListUpdateOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("PUT", "/list/{listId}", data) as any
  },
})
