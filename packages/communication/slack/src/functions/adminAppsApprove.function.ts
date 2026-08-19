import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminAppsApproveInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.apps:write`"),
  app_id: z.string().optional().describe("The id of the app to approve."),
  request_id: z.string().optional().describe("The id of the request to approve."),
  team_id: z.string().optional(),
})

export const AdminAppsApproveOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminAppsApprove = pikkuSessionlessFunc({
  description: "Approve an app for installation on a workspace.",
  input: AdminAppsApproveInput,
  output: AdminAppsApproveOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.apps.approve", data) as any
  },
})
