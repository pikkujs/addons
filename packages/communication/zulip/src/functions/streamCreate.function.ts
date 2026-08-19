import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const StreamCreateInput = z.object({
  subscriptions: z.string().optional(),
  invite_only: z.boolean().optional(),
})

export const StreamCreateOutput = z.record(z.string(), z.unknown())

export const streamCreate = pikkuSessionlessFunc({
  description: "Create a stream",
  input: StreamCreateInput,
  output: StreamCreateOutput,
  func: async ({ zulip }, data) => {
    return zulip.call("POST", "/users/me/subscriptions", data) as any
  },
})
