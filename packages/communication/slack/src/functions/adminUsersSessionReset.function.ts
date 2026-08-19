import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminUsersSessionResetInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.users:write`"),
  mobile_only: z.boolean().optional().describe("Only expire mobile sessions (default: false)"),
  user_id: z.string().describe("The ID of the user to wipe sessions for"),
  web_only: z.boolean().optional().describe("Only expire web sessions (default: false)"),
})

export const AdminUsersSessionResetOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminUsersSessionReset = pikkuSessionlessFunc({
  description: "Wipes all valid sessions on all devices for a given user",
  input: AdminUsersSessionResetInput,
  output: AdminUsersSessionResetOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.users.session.reset", data) as any
  },
})
