import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AgentGetInput = z.object({
  id: z.string(),
})

export const AgentGetOutput = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  scriptId: z.string().optional(),
})

export const agentGet = pikkuSessionlessFunc({
  description: "Get an agent by ID",
  input: AgentGetInput,
  output: AgentGetOutput,
  func: async ({ phantombuster }, data) => {
    return phantombuster.call("GET", "/agents/fetch", data) as any
  },
})
