import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GoalDeleteInput = z.object({
  goalId: z.string(),
})

export const GoalDeleteOutput = z.record(z.string(), z.unknown())

export const goalDelete = pikkuSessionlessFunc({
  description: "Goal delete",
  input: GoalDeleteInput,
  output: GoalDeleteOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("DELETE", "/goal/{goalId}", data) as any
  },
})
