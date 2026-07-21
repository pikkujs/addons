import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminAppsRestrictedListInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.apps:read`"),
  limit: z.number().int().optional().describe("The maximum number of items to return. Must be between 1 - 1000 both inclusive."),
  cursor: z.string().optional().describe("Set `cursor` to `next_cursor` returned by the previous call to list items in the next page"),
  team_id: z.string().optional(),
  enterprise_id: z.string().optional(),
})

export const AdminAppsRestrictedListOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminAppsRestrictedList = pikkuSessionlessFunc({
  description: "List restricted apps for an org or workspace.",
  input: AdminAppsRestrictedListInput,
  output: AdminAppsRestrictedListOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/admin.apps.restricted.list", data) as any
  },
})
