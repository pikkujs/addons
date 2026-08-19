import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserDeactivateInput = z.object({
  userId: z.string(),
})

export const UserDeactivateOutput = z.record(z.string(), z.unknown())

export const userDeactivate = pikkuSessionlessFunc({
  description: "Deactivate a user",
  input: UserDeactivateInput,
  output: UserDeactivateOutput,
  func: async ({ zulip }, data) => {
    return zulip.call("DELETE", "/users/{userId}", data) as any
  },
})
