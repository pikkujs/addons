import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CardCommentCreateInput = z.object({
  cardId: z.string(),
  text: z.string().optional(),
})

export const CardCommentCreateOutput = z.record(z.string(), z.unknown())

export const cardCommentCreate = pikkuSessionlessFunc({
  description: "Create a card comment",
  input: CardCommentCreateInput,
  output: CardCommentCreateOutput,
  func: async ({ trello }, data) => {
    return trello.call("POST", "/cards/{cardId}/actions/comments", data) as any
  },
})
