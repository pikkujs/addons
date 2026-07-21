import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminInviteRequestsApproveInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.invites:write`"),
  invite_request_id: z.string().describe("ID of the request to invite."),
  team_id: z.string().optional().describe("ID for the workspace where the invite request was made."),
})

export const AdminInviteRequestsApproveOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminInviteRequestsApprove = pikkuSessionlessFunc({
  description: "Approve a workspace invite request.",
  input: AdminInviteRequestsApproveInput,
  output: AdminInviteRequestsApproveOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.inviteRequests.approve", data) as any
  },
})
