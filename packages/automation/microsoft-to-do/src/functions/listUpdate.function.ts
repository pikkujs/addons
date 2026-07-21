import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListUpdateInput = z.object({
  listId: z.string(),
  displayName: z.string().optional(),
})

export const ListUpdateOutput = z.record(z.string(), z.unknown())

export const listUpdate = pikkuSessionlessFunc({
  description: "Update a task list",
  input: ListUpdateInput,
  output: ListUpdateOutput,
  func: async ({ microsoftToDo }, data) => {
    return microsoftToDo.call("PATCH", "/todo/lists/{listId}", data) as any
  },
})
