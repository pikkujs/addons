import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserResubscribeInput = z.object({
  body: z.string().optional(),
})

export const UserResubscribeOutput = z.record(z.string(), z.unknown())

export const userResubscribe = pikkuSessionlessFunc({
  description: "User resubscribe",
  input: UserResubscribeInput,
  output: UserResubscribeOutput,
  func: async ({ vero }, data) => {
    return vero.call("POST", "/users/resubscribe", data) as any
  },
})
