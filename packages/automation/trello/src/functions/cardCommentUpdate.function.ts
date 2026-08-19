import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CardCommentUpdateInput = z.object({
  cardId: z.string(),
  commentId: z.string(),
  text: z.string().optional(),
})

export const CardCommentUpdateOutput = z.record(z.string(), z.unknown())

export const cardCommentUpdate = pikkuSessionlessFunc({
  description: "Update a card comment",
  input: CardCommentUpdateInput,
  output: CardCommentUpdateOutput,
  func: async ({ trello }, data) => {
    return trello.call("PUT", "/cards/{cardId}/actions/{commentId}/comments", data) as any
  },
})
