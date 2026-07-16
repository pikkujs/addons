import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TeamBillableInfoInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin`"),
  user: z.string().optional().describe("A user to retrieve the billable information for. Defaults to all users."),
})

export const TeamBillableInfoOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const teamBillableInfo = pikkuSessionlessFunc({
  description: "Gets billable users information for the current team.",
  input: TeamBillableInfoInput,
  output: TeamBillableInfoOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/team.billableInfo", data) as any
  },
})
