import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChannelMessageGetAllInput = z.object({
  teamId: z.string(),
  channelId: z.string(),
})

export const ChannelMessageGetAllOutput = z.record(z.string(), z.unknown())

export const channelMessageGetAll = pikkuSessionlessFunc({
  description: "Get many channel messages",
  input: ChannelMessageGetAllInput,
  output: ChannelMessageGetAllOutput,
  func: async ({ microsoftTeams }, data) => {
    return microsoftTeams.call("GET", "/teams/{teamId}/channels/{channelId}/messages", data) as any
  },
})
