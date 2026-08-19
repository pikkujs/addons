import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListDeleteInput = z.object({
  listId: z.string(),
})

export const ListDeleteOutput = z.record(z.string(), z.unknown())

export const listDelete = pikkuSessionlessFunc({
  description: "Delete a task list",
  input: ListDeleteInput,
  output: ListDeleteOutput,
  func: async ({ microsoftToDo }, data) => {
    return microsoftToDo.call("DELETE", "/todo/lists/{listId}", data) as any
  },
})
