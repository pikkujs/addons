import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChannelUpdateInput = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
})

export const ChannelUpdateOutput = z.record(z.string(), z.unknown())

export const channelUpdate = pikkuSessionlessFunc({
  description: "Update a channel",
  input: ChannelUpdateInput,
  output: ChannelUpdateOutput,
  func: async ({ twist }, data) => {
    return twist.call("POST", "/channels/update", data) as any
  },
})
