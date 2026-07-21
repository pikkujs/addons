import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CardGetAllInput = z.object({
  boardId: z.string(),
  listId: z.string(),
})

export const CardGetAllOutput = z.record(z.string(), z.unknown())

export const cardGetAll = pikkuSessionlessFunc({
  description: "Get all cards in a list",
  input: CardGetAllInput,
  output: CardGetAllOutput,
  func: async ({ wekan }, data) => {
    return wekan.call("GET", "/boards/{boardId}/lists/{listId}/cards", data) as any
  },
})
