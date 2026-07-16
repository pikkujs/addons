import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserGetInput = z.object({
  id: z.string(),
})

export const UserGetOutput = z.record(z.string(), z.unknown())

export const userGet = pikkuSessionlessFunc({
  description: "Get user",
  input: UserGetInput,
  output: UserGetOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("GET", "/sobjects/User/{id}", data) as any
  },
})
