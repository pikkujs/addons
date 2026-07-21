import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChannelUpdateInput = z.object({
  teamId: z.string(),
  channelId: z.string(),
  displayName: z.string().optional(),
  description: z.string().optional(),
})

export const ChannelUpdateOutput = z.record(z.string(), z.unknown())

export const channelUpdate = pikkuSessionlessFunc({
  description: "Update a channel",
  input: ChannelUpdateInput,
  output: ChannelUpdateOutput,
  func: async ({ microsoftTeams }, data) => {
    return microsoftTeams.call("PATCH", "/teams/{teamId}/channels/{channelId}", data) as any
  },
})
