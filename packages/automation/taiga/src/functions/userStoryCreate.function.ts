import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserStoryCreateInput = z.object({
  project: z.string().optional(),
  subject: z.string().optional(),
})

export const UserStoryCreateOutput = z.record(z.string(), z.unknown())

export const userStoryCreate = pikkuSessionlessFunc({
  description: "UserStoryCreate",
  input: UserStoryCreateInput,
  output: UserStoryCreateOutput,
  func: async ({ taiga }, data) => {
    return taiga.call("POST", "/userstories", data) as any
  },
})
