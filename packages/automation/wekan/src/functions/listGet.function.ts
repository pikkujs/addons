import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListGetInput = z.object({
  boardId: z.string(),
  listId: z.string(),
})

export const ListGetOutput = z.record(z.string(), z.unknown())

export const listGet = pikkuSessionlessFunc({
  description: "Get a list",
  input: ListGetInput,
  output: ListGetOutput,
  func: async ({ wekan }, data) => {
    return wekan.call("GET", "/boards/{boardId}/lists/{listId}", data) as any
  },
})
