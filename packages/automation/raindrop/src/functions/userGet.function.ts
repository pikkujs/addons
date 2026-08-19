import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserGetOutput = z.record(z.string(), z.unknown())

export const userGet = pikkuSessionlessFunc({
  description: "Get the authenticated user",
  output: UserGetOutput,
  func: async ({ raindrop }) => {
    return raindrop.call("GET", "/user") as any
  },
})
