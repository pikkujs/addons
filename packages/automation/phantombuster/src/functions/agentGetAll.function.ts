import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AgentGetAllOutput = z.array(z.object({
  id: z.string().optional(),
  name: z.string().optional(),
}))

export const agentGetAll = pikkuSessionlessFunc({
  description: "Get many agents of the current user's organization",
  output: AgentGetAllOutput,
  func: async ({ phantombuster }) => {
    return phantombuster.call("GET", "/agents/fetch-all") as any
  },
})
