import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListGetAllInput = z.object({
  id: z.string(),
})

export const ListGetAllOutput = z.record(z.string(), z.unknown())

export const listGetAll = pikkuSessionlessFunc({
  description: "Get many lists",
  input: ListGetAllInput,
  output: ListGetAllOutput,
  func: async ({ trello }, data) => {
    return trello.call("GET", "/boards/{id}/lists", data) as any
  },
})
