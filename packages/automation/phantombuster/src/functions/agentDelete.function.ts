import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AgentDeleteInput = z.object({
  id: z.string().optional(),
})

export const AgentDeleteOutput = z.object({
  success: z.boolean().optional(),
})

export const agentDelete = pikkuSessionlessFunc({
  description: "Delete an agent by ID",
  input: AgentDeleteInput,
  output: AgentDeleteOutput,
  func: async ({ phantombuster }, data) => {
    return phantombuster.call("POST", "/agents/delete", data) as any
  },
})
