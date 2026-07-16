import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ProfileGetInput = z.object({
  details: z.string().optional(),
})

export const ProfileGetOutput = z.record(z.string(), z.unknown())

export const profileGet = pikkuSessionlessFunc({
  description: "Get the authenticated user's profile",
  input: ProfileGetInput,
  output: ProfileGetOutput,
  func: async ({ reddit }, data) => {
    return reddit.call("GET", "/api/v1/me", data) as any
  },
})
