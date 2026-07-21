import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AgentLaunchInput = z.object({
  id: z.string().optional(),
  manualLaunch: z.boolean().optional(),
  maxInstanceCount: z.number().optional(),
  saveArgument: z.string().optional(),
})

export const AgentLaunchOutput = z.object({
  containerId: z.string().optional(),
})

export const agentLaunch = pikkuSessionlessFunc({
  description: "Add an agent to the launch queue",
  input: AgentLaunchInput,
  output: AgentLaunchOutput,
  func: async ({ phantombuster }, data) => {
    return phantombuster.call("POST", "/agents/launch", data) as any
  },
})
