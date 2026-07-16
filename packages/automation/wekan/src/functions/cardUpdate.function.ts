import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CardUpdateInput = z.object({
  boardId: z.string(),
  listId: z.string(),
  cardId: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
})

export const CardUpdateOutput = z.record(z.string(), z.unknown())

export const cardUpdate = pikkuSessionlessFunc({
  description: "Update a card",
  input: CardUpdateInput,
  output: CardUpdateOutput,
  func: async ({ wekan }, data) => {
    return wekan.call("PUT", "/boards/{boardId}/lists/{listId}/cards/{cardId}", data) as any
  },
})
