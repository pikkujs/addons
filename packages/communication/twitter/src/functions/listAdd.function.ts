import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListAddInput = z.object({
  listId: z.string(),
  user_id: z.string().optional(),
})

export const ListAddOutput = z.record(z.string(), z.unknown())

export const listAdd = pikkuSessionlessFunc({
  description: "Add a member to a list",
  input: ListAddInput,
  output: ListAddOutput,
  func: async ({ twitter }, data) => {
    return twitter.call("POST", "/lists/{listId}/members", data) as any
  },
})
