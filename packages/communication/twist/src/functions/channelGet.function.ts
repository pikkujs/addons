import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChannelGetInput = z.object({
  id: z.string(),
})

export const ChannelGetOutput = z.record(z.string(), z.unknown())

export const channelGet = pikkuSessionlessFunc({
  description: "Get a channel",
  input: ChannelGetInput,
  output: ChannelGetOutput,
  func: async ({ twist }, data) => {
    return twist.call("GET", "/channels/getone", data) as any
  },
})
