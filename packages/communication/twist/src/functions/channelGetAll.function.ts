import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChannelGetAllInput = z.object({
  workspace_id: z.string(),
})

export const ChannelGetAllOutput = z.record(z.string(), z.unknown())

export const channelGetAll = pikkuSessionlessFunc({
  description: "Get all channels",
  input: ChannelGetAllInput,
  output: ChannelGetAllOutput,
  func: async ({ twist }, data) => {
    return twist.call("GET", "/channels/get", data) as any
  },
})
