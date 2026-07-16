import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminAppsRestrictInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.apps:write`"),
  app_id: z.string().optional().describe("The id of the app to restrict."),
  request_id: z.string().optional().describe("The id of the request to restrict."),
  team_id: z.string().optional(),
})

export const AdminAppsRestrictOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminAppsRestrict = pikkuSessionlessFunc({
  description: "Restrict an app for installation on a workspace.",
  input: AdminAppsRestrictInput,
  output: AdminAppsRestrictOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.apps.restrict", data) as any
  },
})
