import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserStoryDeleteInput = z.object({
  id: z.string(),
})

export const UserStoryDeleteOutput = z.record(z.string(), z.unknown())

export const userStoryDelete = pikkuSessionlessFunc({
  description: "UserStoryDelete",
  input: UserStoryDeleteInput,
  output: UserStoryDeleteOutput,
  func: async ({ taiga }, data) => {
    return taiga.call("DELETE", "/userstories/{id}", data) as any
  },
})
