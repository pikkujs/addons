import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AccountWhoamiOutput = z.object({
  user_id: z.string().optional(),
})

export const accountWhoami = pikkuSessionlessFunc({
  description: "Get the current user account",
  output: AccountWhoamiOutput,
  func: async ({ matrix }) => {
    return matrix.call("GET", "/account/whoami") as any
  },
})
