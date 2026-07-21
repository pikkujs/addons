import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BoardGetAllInput = z.object({
  userId: z.string(),
})

export const BoardGetAllOutput = z.record(z.string(), z.unknown())

export const boardGetAll = pikkuSessionlessFunc({
  description: "Get all boards for a user",
  input: BoardGetAllInput,
  output: BoardGetAllOutput,
  func: async ({ wekan }, data) => {
    return wekan.call("GET", "/users/{userId}/boards", data) as any
  },
})
