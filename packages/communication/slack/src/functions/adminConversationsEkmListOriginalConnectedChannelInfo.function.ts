import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminConversationsEkmListOriginalConnectedChannelInfoInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.conversations:read`"),
  channel_ids: z.string().optional().describe("A comma-separated list of channels to filter to."),
  team_ids: z.string().optional().describe("A comma-separated list of the workspaces to which the channels you would like returned belong."),
  limit: z.number().int().optional().describe("The maximum number of items to return. Must be between 1 - 1000 both inclusive."),
  cursor: z.string().optional().describe("Set `cursor` to `next_cursor` returned by the previous call to list items in the next page."),
})

export const AdminConversationsEkmListOriginalConnectedChannelInfoOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminConversationsEkmListOriginalConnectedChannelInfo = pikkuSessionlessFunc({
  description: "List all disconnected channels—i.e., channels that were once connected to other workspaces and then disconnected—and the corresponding original channel IDs for key revocation with EKM.",
  input: AdminConversationsEkmListOriginalConnectedChannelInfoInput,
  output: AdminConversationsEkmListOriginalConnectedChannelInfoOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/admin.conversations.ekm.listOriginalConnectedChannelInfo", data) as any
  },
})
