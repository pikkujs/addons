import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CardCommentDeleteInput = z.object({
  boardId: z.string(),
  cardId: z.string(),
  commentId: z.string(),
})

export const CardCommentDeleteOutput = z.record(z.string(), z.unknown())

export const cardCommentDelete = pikkuSessionlessFunc({
  description: "Delete a comment",
  input: CardCommentDeleteInput,
  output: CardCommentDeleteOutput,
  func: async ({ wekan }, data) => {
    return wekan.call("DELETE", "/boards/{boardId}/cards/{cardId}/comments/{commentId}", data) as any
  },
})
