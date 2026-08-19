import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserListRemoveInput = z.object({
  listId: z.number().optional(),
  subscribers: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const UserListRemoveOutput = z.record(z.string(), z.unknown())

export const userListRemove = pikkuSessionlessFunc({
  description: "Remove subscribers from a list",
  input: UserListRemoveInput,
  output: UserListRemoveOutput,
  func: async ({ iterable }, data) => {
    return iterable.call("POST", "/lists/unsubscribe", data) as any
  },
})
