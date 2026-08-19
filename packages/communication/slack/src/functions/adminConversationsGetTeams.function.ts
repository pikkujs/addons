import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminConversationsGetTeamsInput = z.object({
  channel_id: z.string().describe("The channel to determine connected workspaces within the organization for."),
  cursor: z.string().optional().describe("Set `cursor` to `next_cursor` returned by the previous call to list items in the next page"),
  limit: z.number().int().optional().describe("The maximum number of items to return. Must be between 1 - 1000 both inclusive."),
  token: z.string().describe("Authentication token. Requires scope: `admin.conversations:read`"),
})

export const AdminConversationsGetTeamsOutput = z.object({
  ok: z.literal(true),
  response_metadata: z.object({
    next_cursor: z.string(),
  }).optional(),
  team_ids: z.array(z.string()),
}).describe("Schema for successful response of admin.conversations.getTeams")

export const adminConversationsGetTeams = pikkuSessionlessFunc({
  description: "Get all the workspaces a given public or private channel is connected to within this Enterprise org.",
  input: AdminConversationsGetTeamsInput,
  output: AdminConversationsGetTeamsOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/admin.conversations.getTeams", data) as any
  },
})
