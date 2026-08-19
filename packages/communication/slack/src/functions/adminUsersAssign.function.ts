import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminUsersAssignInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.users:write`"),
  channel_ids: z.string().optional().describe("Comma separated values of channel IDs to add user in the new workspace."),
  is_restricted: z.boolean().optional().describe("True if user should be added to the workspace as a guest."),
  is_ultra_restricted: z.boolean().optional().describe("True if user should be added to the workspace as a single-channel guest."),
  team_id: z.string().describe("The ID (`T1234`) of the workspace."),
  user_id: z.string().describe("The ID of the user to add to the workspace."),
})

export const AdminUsersAssignOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminUsersAssign = pikkuSessionlessFunc({
  description: "Add an Enterprise user to a workspace.",
  input: AdminUsersAssignInput,
  output: AdminUsersAssignOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.users.assign", data) as any
  },
})
