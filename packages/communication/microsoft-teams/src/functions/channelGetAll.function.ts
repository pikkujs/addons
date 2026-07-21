import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChannelGetAllInput = z.object({
  teamId: z.string(),
})

export const ChannelGetAllOutput = z.record(z.string(), z.unknown())

export const channelGetAll = pikkuSessionlessFunc({
  description: "Get many channels",
  input: ChannelGetAllInput,
  output: ChannelGetAllOutput,
  func: async ({ microsoftTeams }, data) => {
    return microsoftTeams.call("GET", "/teams/{teamId}/channels", data) as any
  },
})
