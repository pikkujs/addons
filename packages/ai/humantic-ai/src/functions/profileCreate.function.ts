import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ProfileCreateInput = z.object({
  userid: z.string(),
})

export const ProfileCreateOutput = z.record(z.string(), z.unknown())

export const profileCreate = pikkuSessionlessFunc({
  description: "Create a profile",
  input: ProfileCreateInput,
  output: ProfileCreateOutput,
  func: async ({ humanticAi }, data) => {
    return humanticAi.call("GET", "/user-profile/create", data) as any
  },
})
