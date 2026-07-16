import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListUpdateInput = z.object({
  id: z.string(),
  name: z.string().optional(),
  idBoard: z.string().optional(),
})

export const ListUpdateOutput = z.record(z.string(), z.unknown())

export const listUpdate = pikkuSessionlessFunc({
  description: "Update a list",
  input: ListUpdateInput,
  output: ListUpdateOutput,
  func: async ({ trello }, data) => {
    return trello.call("PUT", "/lists/{id}", data) as any
  },
})
