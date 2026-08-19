import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ProfileGetInput = z.object({
  profileId: z.string(),
})

export const ProfileGetOutput = z.record(z.string(), z.unknown())

export const profileGet = pikkuSessionlessFunc({
  description: "Get profile by id",
  input: ProfileGetInput,
  output: ProfileGetOutput,
  func: async ({ wise }, data) => {
    return wise.call("GET", "/v1/profiles/{profileId}", data) as any
  },
})
