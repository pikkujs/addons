import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserGetInput = z.object({
  id: z.string(),
})

export const UserGetOutput = z.record(z.string(), z.unknown())

export const userGet = pikkuSessionlessFunc({
  description: "User get",
  input: UserGetInput,
  output: UserGetOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("GET", "/users/{id}", data) as any
  },
})
