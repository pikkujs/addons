import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserStoryGetInput = z.object({
  id: z.string(),
})

export const UserStoryGetOutput = z.record(z.string(), z.unknown())

export const userStoryGet = pikkuSessionlessFunc({
  description: "UserStoryGet",
  input: UserStoryGetInput,
  output: UserStoryGetOutput,
  func: async ({ taiga }, data) => {
    return taiga.call("GET", "/userstories/{id}", data) as any
  },
})
