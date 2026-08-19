import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListCreateInput = z.object({
  displayName: z.string().optional(),
})

export const ListCreateOutput = z.record(z.string(), z.unknown())

export const listCreate = pikkuSessionlessFunc({
  description: "Create a task list",
  input: ListCreateInput,
  output: ListCreateOutput,
  func: async ({ microsoftToDo }, data) => {
    return microsoftToDo.call("POST", "/todo/lists", data) as any
  },
})
