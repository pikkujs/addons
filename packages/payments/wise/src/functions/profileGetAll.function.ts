import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ProfileGetAllOutput = z.record(z.string(), z.unknown())

export const profileGetAll = pikkuSessionlessFunc({
  description: "List profiles",
  output: ProfileGetAllOutput,
  func: async ({ wise }) => {
    return wise.call("GET", "/v1/profiles") as any
  },
})
