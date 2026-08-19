import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChannelMessageCreateInput = z.object({
  teamId: z.string(),
  channelId: z.string(),
  content: z.string().optional(),
  contentType: z.string().optional(),
})

export const ChannelMessageCreateOutput = z.record(z.string(), z.unknown())

export const channelMessageCreate = pikkuSessionlessFunc({
  description: "Create a channel message",
  input: ChannelMessageCreateInput,
  output: ChannelMessageCreateOutput,
  func: async ({ microsoftTeams }, data) => {
    return microsoftTeams.call("POST", "/teams/{teamId}/channels/{channelId}/messages", data) as any
  },
})
