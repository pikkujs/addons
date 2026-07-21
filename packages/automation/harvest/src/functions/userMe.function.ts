import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserMeOutput = z.record(z.string(), z.unknown())

export const userMe = pikkuSessionlessFunc({
  description: "User me",
  output: UserMeOutput,
  func: async ({ harvest }) => {
    return harvest.call("GET", "/users/me") as any
  },
})
