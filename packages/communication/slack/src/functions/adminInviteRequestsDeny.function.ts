import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminInviteRequestsDenyInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.invites:write`"),
  invite_request_id: z.string().describe("ID of the request to invite."),
  team_id: z.string().optional().describe("ID for the workspace where the invite request was made."),
})

export const AdminInviteRequestsDenyOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminInviteRequestsDeny = pikkuSessionlessFunc({
  description: "Deny a workspace invite request.",
  input: AdminInviteRequestsDenyInput,
  output: AdminInviteRequestsDenyOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.inviteRequests.deny", data) as any
  },
})
