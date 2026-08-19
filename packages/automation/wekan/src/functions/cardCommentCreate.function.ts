import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CardCommentCreateInput = z.object({
  boardId: z.string(),
  cardId: z.string(),
  authorId: z.string().optional(),
  comment: z.string().optional(),
})

export const CardCommentCreateOutput = z.record(z.string(), z.unknown())

export const cardCommentCreate = pikkuSessionlessFunc({
  description: "Create a comment on a card",
  input: CardCommentCreateInput,
  output: CardCommentCreateOutput,
  func: async ({ wekan }, data) => {
    return wekan.call("POST", "/boards/{boardId}/cards/{cardId}/comments", data) as any
  },
})
