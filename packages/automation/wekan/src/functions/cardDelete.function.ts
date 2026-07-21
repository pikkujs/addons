import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CardDeleteInput = z.object({
  boardId: z.string(),
  listId: z.string(),
  cardId: z.string(),
})

export const CardDeleteOutput = z.record(z.string(), z.unknown())

export const cardDelete = pikkuSessionlessFunc({
  description: "Delete a card",
  input: CardDeleteInput,
  output: CardDeleteOutput,
  func: async ({ wekan }, data) => {
    return wekan.call("DELETE", "/boards/{boardId}/lists/{listId}/cards/{cardId}", data) as any
  },
})
