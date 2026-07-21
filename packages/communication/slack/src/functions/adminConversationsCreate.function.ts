import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminConversationsCreateInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.conversations:write`"),
  description: z.string().optional().describe("Description of the public or private channel to create."),
  is_private: z.boolean().describe("When `true`, creates a private channel instead of a public channel"),
  name: z.string().describe("Name of the public or private channel to create."),
  org_wide: z.boolean().optional().describe("When `true`, the channel will be available org-wide. Note: if the channel is not `org_wide=true`, you must specify a `team_id` for this channel"),
  team_id: z.string().optional().describe("The workspace to create the channel in. Note: this argument is required unless you set `org_wide=true`."),
})

export const AdminConversationsCreateOutput = z.object({
  channel_id: z.string().regex(new RegExp("^[C][A-Z0-9]{2,}$")).optional(),
  ok: z.literal(true),
}).describe("Schema for successful response of admin.conversations.create")

export const adminConversationsCreate = pikkuSessionlessFunc({
  description: "Create a public or private channel-based conversation.",
  input: AdminConversationsCreateInput,
  output: AdminConversationsCreateOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.conversations.create", data) as any
  },
})
