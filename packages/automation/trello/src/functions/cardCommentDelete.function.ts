import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CardCommentDeleteInput = z.object({
  cardId: z.string(),
  commentId: z.string(),
})

export const CardCommentDeleteOutput = z.record(z.string(), z.unknown())

export const cardCommentDelete = pikkuSessionlessFunc({
  description: "Delete a card comment",
  input: CardCommentDeleteInput,
  output: CardCommentDeleteOutput,
  func: async ({ trello }, data) => {
    return trello.call("DELETE", "/cards/{cardId}/actions/{commentId}/comments", data) as any
  },
})
