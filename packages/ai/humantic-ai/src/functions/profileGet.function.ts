import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ProfileGetInput = z.object({
  userid: z.string(),
  persona: z.string().optional(),
})

export const ProfileGetOutput = z.record(z.string(), z.unknown())

export const profileGet = pikkuSessionlessFunc({
  description: "Retrieve a profile",
  input: ProfileGetInput,
  output: ProfileGetOutput,
  func: async ({ humanticAi }, data) => {
    return humanticAi.call("GET", "/user-profile", data) as any
  },
})
