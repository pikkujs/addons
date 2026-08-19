import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListDeleteInput = z.object({
  boardId: z.string(),
  listId: z.string(),
})

export const ListDeleteOutput = z.record(z.string(), z.unknown())

export const listDelete = pikkuSessionlessFunc({
  description: "Delete a list",
  input: ListDeleteInput,
  output: ListDeleteOutput,
  func: async ({ wekan }, data) => {
    return wekan.call("DELETE", "/boards/{boardId}/lists/{listId}", data) as any
  },
})
