import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserUnsubscribeInput = z.object({
  body: z.string().optional(),
})

export const UserUnsubscribeOutput = z.record(z.string(), z.unknown())

export const userUnsubscribe = pikkuSessionlessFunc({
  description: "User unsubscribe",
  input: UserUnsubscribeInput,
  output: UserUnsubscribeOutput,
  func: async ({ vero }, data) => {
    return vero.call("POST", "/users/unsubscribe", data) as any
  },
})
