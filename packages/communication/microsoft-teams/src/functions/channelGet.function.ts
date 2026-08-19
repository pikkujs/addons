import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChannelGetInput = z.object({
  teamId: z.string(),
  channelId: z.string(),
})

export const ChannelGetOutput = z.record(z.string(), z.unknown())

export const channelGet = pikkuSessionlessFunc({
  description: "Get a channel",
  input: ChannelGetInput,
  output: ChannelGetOutput,
  func: async ({ microsoftTeams }, data) => {
    return microsoftTeams.call("GET", "/teams/{teamId}/channels/{channelId}", data) as any
  },
})
