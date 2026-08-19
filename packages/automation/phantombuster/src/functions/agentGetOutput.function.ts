import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AgentGetOutputInput = z.object({
  id: z.string(),
  prevContainerId: z.string().optional(),
  prevStatus: z.string().optional(),
  prevRuntimeEventIndex: z.number().optional(),
})

export const AgentGetOutputOutput = z.object({
  containerId: z.string().optional(),
  output: z.string().optional(),
  status: z.string().optional(),
})

export const agentGetOutput = pikkuSessionlessFunc({
  description: "Get the output of the most recent container of an agent",
  input: AgentGetOutputInput,
  output: AgentGetOutputOutput,
  func: async ({ phantombuster }, data) => {
    return phantombuster.call("GET", "/agents/fetch-output", data) as any
  },
})
