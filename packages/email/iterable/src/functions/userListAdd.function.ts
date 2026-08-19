import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserListAddInput = z.object({
  listId: z.number().optional(),
  subscribers: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const UserListAddOutput = z.record(z.string(), z.unknown())

export const userListAdd = pikkuSessionlessFunc({
  description: "Add subscribers to a list",
  input: UserListAddInput,
  output: UserListAddOutput,
  func: async ({ iterable }, data) => {
    return iterable.call("POST", "/lists/subscribe", data) as any
  },
})
