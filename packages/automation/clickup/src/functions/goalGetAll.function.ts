import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GoalGetAllInput = z.object({
  teamId: z.string(),
  limit: z.number().optional(),
})

export const GoalGetAllOutput = z.record(z.string(), z.unknown())

export const goalGetAll = pikkuSessionlessFunc({
  description: "Goal get all",
  input: GoalGetAllInput,
  output: GoalGetAllOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("GET", "/team/{teamId}/goal", data) as any
  },
})
