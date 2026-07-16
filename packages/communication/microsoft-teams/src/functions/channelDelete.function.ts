import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChannelDeleteInput = z.object({
  teamId: z.string(),
  channelId: z.string(),
})

export const ChannelDeleteOutput = z.record(z.string(), z.unknown())

export const channelDelete = pikkuSessionlessFunc({
  description: "Delete a channel",
  input: ChannelDeleteInput,
  output: ChannelDeleteOutput,
  func: async ({ microsoftTeams }, data) => {
    return microsoftTeams.call("DELETE", "/teams/{teamId}/channels/{channelId}", data) as any
  },
})
