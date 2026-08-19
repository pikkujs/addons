import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListGetInput = z.object({
  listId: z.string(),
})

export const ListGetOutput = z.record(z.string(), z.unknown())

export const listGet = pikkuSessionlessFunc({
  description: "Get a task list",
  input: ListGetInput,
  output: ListGetOutput,
  func: async ({ microsoftToDo }, data) => {
    return microsoftToDo.call("GET", "/todo/lists/{listId}", data) as any
  },
})
