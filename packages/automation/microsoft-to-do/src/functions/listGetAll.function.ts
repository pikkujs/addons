import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListGetAllInput = z.object({
  $top: z.number().int().optional(),
})

export const ListGetAllOutput = z.record(z.string(), z.unknown())

export const listGetAll = pikkuSessionlessFunc({
  description: "List task lists",
  input: ListGetAllInput,
  output: ListGetAllOutput,
  func: async ({ microsoftToDo }, data) => {
    return microsoftToDo.call("GET", "/todo/lists", data) as any
  },
})
