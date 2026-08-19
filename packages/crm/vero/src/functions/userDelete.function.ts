import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserDeleteInput = z.object({
  body: z.string().optional(),
})

export const UserDeleteOutput = z.record(z.string(), z.unknown())

export const userDelete = pikkuSessionlessFunc({
  description: "User delete",
  input: UserDeleteInput,
  output: UserDeleteOutput,
  func: async ({ vero }, data) => {
    return vero.call("POST", "/users/delete", data) as any
  },
})
