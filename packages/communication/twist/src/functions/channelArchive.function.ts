import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChannelArchiveInput = z.object({
  id: z.string(),
})

export const ChannelArchiveOutput = z.record(z.string(), z.unknown())

export const channelArchive = pikkuSessionlessFunc({
  description: "Archive a channel",
  input: ChannelArchiveInput,
  output: ChannelArchiveOutput,
  func: async ({ twist }, data) => {
    return twist.call("POST", "/channels/archive", data) as any
  },
})
