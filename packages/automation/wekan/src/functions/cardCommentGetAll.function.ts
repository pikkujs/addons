import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CardCommentGetAllInput = z.object({
  boardId: z.string(),
  cardId: z.string(),
})

export const CardCommentGetAllOutput = z.record(z.string(), z.unknown())

export const cardCommentGetAll = pikkuSessionlessFunc({
  description: "Get all comments on a card",
  input: CardCommentGetAllInput,
  output: CardCommentGetAllOutput,
  func: async ({ wekan }, data) => {
    return wekan.call("GET", "/boards/{boardId}/cards/{cardId}/comments", data) as any
  },
})
