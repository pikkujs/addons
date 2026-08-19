import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AgentLaunchSyncInput = z.object({
  id: z.string().optional(),
  manualLaunch: z.boolean().optional(),
  maxInstanceCount: z.number().optional(),
  saveArgument: z.string().optional(),
})

export const AgentLaunchSyncOutput = z.object({
  containerId: z.string().optional(),
  output: z.string().optional(),
})

export const agentLaunchSync = pikkuSessionlessFunc({
  description: "Launch an agent and stream results",
  input: AgentLaunchSyncInput,
  output: AgentLaunchSyncOutput,
  func: async ({ phantombuster }, data) => {
    return phantombuster.call("POST", "/agents/launch-sync", data) as any
  },
})
