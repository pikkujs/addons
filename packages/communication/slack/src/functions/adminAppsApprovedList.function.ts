import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminAppsApprovedListInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.apps:read`"),
  limit: z.number().int().optional().describe("The maximum number of items to return. Must be between 1 - 1000 both inclusive."),
  cursor: z.string().optional().describe("Set `cursor` to `next_cursor` returned by the previous call to list items in the next page"),
  team_id: z.string().optional(),
  enterprise_id: z.string().optional(),
})

export const AdminAppsApprovedListOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminAppsApprovedList = pikkuSessionlessFunc({
  description: "List approved apps for an org or workspace.",
  input: AdminAppsApprovedListInput,
  output: AdminAppsApprovedListOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/admin.apps.approved.list", data) as any
  },
})
