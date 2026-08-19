import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminInviteRequestsApprovedListInput = z.object({
  team_id: z.string().optional().describe("ID for the workspace where the invite requests were made."),
  cursor: z.string().optional().describe("Value of the `next_cursor` field sent as part of the previous API response"),
  limit: z.number().int().optional().describe("The number of results that will be returned by the API on each invocation. Must be between 1 - 1000, both inclusive"),
  token: z.string().describe("Authentication token. Requires scope: `admin.invites:read`"),
})

export const AdminInviteRequestsApprovedListOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminInviteRequestsApprovedList = pikkuSessionlessFunc({
  description: "List all approved workspace invite requests.",
  input: AdminInviteRequestsApprovedListInput,
  output: AdminInviteRequestsApprovedListOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/admin.inviteRequests.approved.list", data) as any
  },
})
