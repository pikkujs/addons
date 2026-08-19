import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChannelCreateInput = z.object({
  teamId: z.string(),
  displayName: z.string().optional(),
  description: z.string().optional(),
  membershipType: z.string().optional(),
})

export const ChannelCreateOutput = z.record(z.string(), z.unknown())

export const channelCreate = pikkuSessionlessFunc({
  description: "Create a channel",
  input: ChannelCreateInput,
  output: ChannelCreateOutput,
  func: async ({ microsoftTeams }, data) => {
    return microsoftTeams.call("POST", "/teams/{teamId}/channels", data) as any
  },
})
