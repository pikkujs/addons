import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RemindersInfoInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `reminders:read`"),
  reminder: z.string().optional().describe("The ID of the reminder"),
})

export const RemindersInfoOutput = z.object({
  ok: z.literal(true),
  reminder: z.object({
    complete_ts: z.number().int().optional(),
    creator: z.string().regex(new RegExp("^[UW][A-Z0-9]{2,}$")),
    id: z.string().regex(new RegExp("^Rm[A-Z0-9]{8,}$")),
    recurring: z.boolean(),
    text: z.string(),
    time: z.number().int().optional(),
    user: z.string().regex(new RegExp("^[UW][A-Z0-9]{2,}$")),
  }),
}).describe("Schema for successful response from reminders.info method")

export const remindersInfo = pikkuSessionlessFunc({
  description: "Gets information about a reminder.",
  input: RemindersInfoInput,
  output: RemindersInfoOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/reminders.info", data) as any
  },
})
