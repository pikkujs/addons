import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserGetSelfOutput = z.record(z.string(), z.unknown())

export const userGetSelf = pikkuSessionlessFunc({
  description: "Get the current user",
  output: UserGetSelfOutput,
  func: async ({ zammad }) => {
    return zammad.call("GET", "/users/me") as any
  },
})
