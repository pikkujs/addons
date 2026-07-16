import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserUpsertInput = z.object({
  email: z.string().optional(),
  userId: z.string().optional(),
  dataFields: z.record(z.string(), z.unknown()).optional(),
})

export const UserUpsertOutput = z.record(z.string(), z.unknown())

export const userUpsert = pikkuSessionlessFunc({
  description: "Create or update a user",
  input: UserUpsertInput,
  output: UserUpsertOutput,
  func: async ({ iterable }, data) => {
    return iterable.call("POST", "/users/update", data) as any
  },
})
