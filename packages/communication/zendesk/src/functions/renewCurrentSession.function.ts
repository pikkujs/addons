import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RenewCurrentSessionOutput = z.object({
  authenticity_token: z.string().optional().describe("A token of authenticity for the request"),
})

export const renewCurrentSession = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins, Agents, End users",
  output: RenewCurrentSessionOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/users/me/session/renew") as any
  },
})
