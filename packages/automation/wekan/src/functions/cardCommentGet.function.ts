import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CardCommentGetInput = z.object({
  boardId: z.string(),
  cardId: z.string(),
  commentId: z.string(),
})

export const CardCommentGetOutput = z.record(z.string(), z.unknown())

export const cardCommentGet = pikkuSessionlessFunc({
  description: "Get a comment",
  input: CardCommentGetInput,
  output: CardCommentGetOutput,
  func: async ({ wekan }, data) => {
    return wekan.call("GET", "/boards/{boardId}/cards/{cardId}/comments/{commentId}", data) as any
  },
})
