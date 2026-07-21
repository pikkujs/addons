import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GoalCreateInput = z.object({
  teamId: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  color: z.string().optional(),
})

export const GoalCreateOutput = z.record(z.string(), z.unknown())

export const goalCreate = pikkuSessionlessFunc({
  description: "Goal create",
  input: GoalCreateInput,
  output: GoalCreateOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("POST", "/team/{teamId}/goal", data) as any
  },
})
