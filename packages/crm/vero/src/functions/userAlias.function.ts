import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserAliasInput = z.object({
  body: z.string().optional(),
})

export const UserAliasOutput = z.record(z.string(), z.unknown())

export const userAlias = pikkuSessionlessFunc({
  description: "User alias",
  input: UserAliasInput,
  output: UserAliasOutput,
  func: async ({ vero }, data) => {
    return vero.call("POST", "/users/reidentify", data) as any
  },
})
