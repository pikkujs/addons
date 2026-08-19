import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserStoryGetAllInput = z.object({
  project: z.string().optional(),
})

export const UserStoryGetAllOutput = z.record(z.string(), z.unknown())

export const userStoryGetAll = pikkuSessionlessFunc({
  description: "UserStoryGetAll",
  input: UserStoryGetAllInput,
  output: UserStoryGetAllOutput,
  func: async ({ taiga }, data) => {
    return taiga.call("GET", "/userstories", data) as any
  },
})
