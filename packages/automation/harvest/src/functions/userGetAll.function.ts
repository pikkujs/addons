import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserGetAllOutput = z.record(z.string(), z.unknown())

export const userGetAll = pikkuSessionlessFunc({
  description: "User get all",
  output: UserGetAllOutput,
  func: async ({ harvest }) => {
    return harvest.call("GET", "/users") as any
  },
})
