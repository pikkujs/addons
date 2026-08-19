import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AgentRunInput = z.object({
  agentId: z.string(),
  prompt: z.string().optional(),
  timeoutSeconds: z.number().optional(),
})

export const AgentRunOutput = z.record(z.string(), z.unknown())

export const agentRun = pikkuSessionlessFunc({
  description: "Run an Airtop agent",
  input: AgentRunInput,
  output: AgentRunOutput,
  func: async ({ airtop }, data) => {
    return airtop.call("POST", "/agents/{agentId}/run", data) as any
  },
})
