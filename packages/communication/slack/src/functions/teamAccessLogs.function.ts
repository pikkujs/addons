import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TeamAccessLogsInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin`"),
  before: z.string().optional().describe("End of time range of logs to include in results (inclusive)."),
  count: z.string().optional(),
  page: z.string().optional(),
})

export const TeamAccessLogsOutput = z.object({
  logins: z.array(z.object({
    count: z.number().int(),
    country: z.string().nullable(),
    date_first: z.number().int(),
    date_last: z.number().int(),
    ip: z.string().nullable(),
    isp: z.string().nullable(),
    region: z.string().nullable(),
    user_agent: z.string(),
    user_id: z.string().regex(new RegExp("^[UW][A-Z0-9]{2,}$")),
    username: z.string(),
  })).min(1),
  ok: z.literal(true),
  paging: z.object({
    count: z.number().int().optional(),
    page: z.number().int(),
    pages: z.number().int().optional(),
    per_page: z.number().int().optional(),
    spill: z.number().int().optional(),
    total: z.number().int(),
  }),
}).describe("Schema for successful response from team.accessLogs method")

export const teamAccessLogs = pikkuSessionlessFunc({
  description: "Gets the access logs for the current team.",
  input: TeamAccessLogsInput,
  output: TeamAccessLogsOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/team.accessLogs", data) as any
  },
})
