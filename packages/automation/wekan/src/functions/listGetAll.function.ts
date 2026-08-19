import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListGetAllInput = z.object({
  boardId: z.string(),
})

export const ListGetAllOutput = z.record(z.string(), z.unknown())

export const listGetAll = pikkuSessionlessFunc({
  description: "Get all lists on a board",
  input: ListGetAllInput,
  output: ListGetAllOutput,
  func: async ({ wekan }, data) => {
    return wekan.call("GET", "/boards/{boardId}/lists", data) as any
  },
})
