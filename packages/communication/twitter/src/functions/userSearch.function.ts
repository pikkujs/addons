import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserSearchInput = z.object({
  username: z.string(),
})

export const UserSearchOutput = z.record(z.string(), z.unknown())

export const userSearch = pikkuSessionlessFunc({
  description: "Search a user by username",
  input: UserSearchInput,
  output: UserSearchOutput,
  func: async ({ twitter }, data) => {
    return twitter.call("GET", "/users/by/username/{username}", data) as any
  },
})
