import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChannelCreateInput = z.object({
  workspace_id: z.string().optional(),
  name: z.string().optional(),
})

export const ChannelCreateOutput = z.record(z.string(), z.unknown())

export const channelCreate = pikkuSessionlessFunc({
  description: "Add a channel",
  input: ChannelCreateInput,
  output: ChannelCreateOutput,
  func: async ({ twist }, data) => {
    return twist.call("POST", "/channels/add", data) as any
  },
})
