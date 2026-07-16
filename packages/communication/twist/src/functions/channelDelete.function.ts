import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChannelDeleteInput = z.object({
  id: z.string(),
})

export const ChannelDeleteOutput = z.record(z.string(), z.unknown())

export const channelDelete = pikkuSessionlessFunc({
  description: "Remove a channel",
  input: ChannelDeleteInput,
  output: ChannelDeleteOutput,
  func: async ({ twist }, data) => {
    return twist.call("POST", "/channels/remove", data) as any
  },
})
