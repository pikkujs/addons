import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListGroupGetAllInput = z.object({
  listId: z.string(),
  categoryId: z.string(),
  count: z.number().int().optional(),
})

export const ListGroupGetAllOutput = z.record(z.string(), z.unknown())

export const listGroupGetAll = pikkuSessionlessFunc({
  description: "Get many groups in an interest category",
  input: ListGroupGetAllInput,
  output: ListGroupGetAllOutput,
  func: async ({ mailchimp }, data) => {
    return mailchimp.call("GET", "/lists/{listId}/interest-categories/{categoryId}/interests", data) as any
  },
})
