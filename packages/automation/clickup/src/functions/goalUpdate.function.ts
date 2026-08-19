import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GoalUpdateInput = z.object({
  goalId: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  color: z.string().optional(),
})

export const GoalUpdateOutput = z.record(z.string(), z.unknown())

export const goalUpdate = pikkuSessionlessFunc({
  description: "Goal update",
  input: GoalUpdateInput,
  output: GoalUpdateOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("PUT", "/goal/{goalId}", data) as any
  },
})
