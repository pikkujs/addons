import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ProfileUpdateInput = z.object({
  userid: z.string(),
  text: z.string().optional(),
})

export const ProfileUpdateOutput = z.record(z.string(), z.unknown())

export const profileUpdate = pikkuSessionlessFunc({
  description: "Update a profile",
  input: ProfileUpdateInput,
  output: ProfileUpdateOutput,
  func: async ({ humanticAi }, data) => {
    return humanticAi.call("POST", "/user-profile/create", data) as any
  },
})
