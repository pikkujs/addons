import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DndTeamInfoInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `dnd:read`"),
  users: z.string().optional().describe("Comma-separated list of users to fetch Do Not Disturb status for"),
})

export const DndTeamInfoOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const dndTeamInfo = pikkuSessionlessFunc({
  description: "Retrieves the Do Not Disturb status for up to 50 users on a team.",
  input: DndTeamInfoInput,
  output: DndTeamInfoOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/dnd.teamInfo", data) as any
  },
})
