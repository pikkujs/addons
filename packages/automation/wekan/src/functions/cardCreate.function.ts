import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CardCreateInput = z.object({
  boardId: z.string(),
  listId: z.string(),
  title: z.string().optional(),
  swimlaneId: z.string().optional(),
  authorId: z.string().optional(),
})

export const CardCreateOutput = z.record(z.string(), z.unknown())

export const cardCreate = pikkuSessionlessFunc({
  description: "Create a card",
  input: CardCreateInput,
  output: CardCreateOutput,
  func: async ({ wekan }, data) => {
    return wekan.call("POST", "/boards/{boardId}/lists/{listId}/cards", data) as any
  },
})
