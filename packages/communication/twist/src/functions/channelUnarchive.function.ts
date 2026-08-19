import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChannelUnarchiveInput = z.object({
  id: z.string(),
})

export const ChannelUnarchiveOutput = z.record(z.string(), z.unknown())

export const channelUnarchive = pikkuSessionlessFunc({
  description: "Unarchive a channel",
  input: ChannelUnarchiveInput,
  output: ChannelUnarchiveOutput,
  func: async ({ twist }, data) => {
    return twist.call("POST", "/channels/unarchive", data) as any
  },
})
