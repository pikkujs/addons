import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminUsersInviteInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.users:write`"),
  channel_ids: z.string().describe("A comma-separated list of `channel_id`s for this user to join. At least one channel is required."),
  custom_message: z.string().optional().describe("An optional message to send to the user in the invite email."),
  email: z.string().describe("The email address of the person to invite."),
  guest_expiration_ts: z.string().optional().describe("Timestamp when guest account should be disabled. Only include this timestamp if you are inviting a guest user and you want their account to expire on a certain date."),
  is_restricted: z.boolean().optional().describe("Is this user a multi-channel guest user? (default: false)"),
  is_ultra_restricted: z.boolean().optional().describe("Is this user a single channel guest user? (default: false)"),
  real_name: z.string().optional().describe("Full name of the user."),
  resend: z.boolean().optional().describe("Allow this invite to be resent in the future if a user has not signed up yet. (default: false)"),
  team_id: z.string().describe("The ID (`T1234`) of the workspace."),
})

export const AdminUsersInviteOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminUsersInvite = pikkuSessionlessFunc({
  description: "Invite a user to a workspace.",
  input: AdminUsersInviteInput,
  output: AdminUsersInviteOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.users.invite", data) as any
  },
})
