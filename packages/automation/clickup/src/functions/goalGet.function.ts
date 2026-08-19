import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GoalGetInput = z.object({
  goalId: z.string(),
})

export const GoalGetOutput = z.record(z.string(), z.unknown())

export const goalGet = pikkuSessionlessFunc({
  description: "Goal get",
  input: GoalGetInput,
  output: GoalGetOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("GET", "/goal/{goalId}", data) as any
  },
})
