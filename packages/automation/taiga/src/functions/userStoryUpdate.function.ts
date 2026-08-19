import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserStoryUpdateInput = z.object({
  id: z.string(),
  subject: z.string().optional(),
})

export const UserStoryUpdateOutput = z.record(z.string(), z.unknown())

export const userStoryUpdate = pikkuSessionlessFunc({
  description: "UserStoryUpdate",
  input: UserStoryUpdateInput,
  output: UserStoryUpdateOutput,
  func: async ({ taiga }, data) => {
    return taiga.call("PATCH", "/userstories/{id}", data) as any
  },
})
