import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CardGetInput = z.object({
  boardId: z.string(),
  listId: z.string(),
  cardId: z.string(),
})

export const CardGetOutput = z.record(z.string(), z.unknown())

export const cardGet = pikkuSessionlessFunc({
  description: "Get a card",
  input: CardGetInput,
  output: CardGetOutput,
  func: async ({ wekan }, data) => {
    return wekan.call("GET", "/boards/{boardId}/lists/{listId}/cards/{cardId}", data) as any
  },
})
