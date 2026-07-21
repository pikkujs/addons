import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RemindersAddInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `reminders:write`"),
  text: z.string().describe("The content of the reminder"),
  time: z.string().describe("When this reminder should happen: the Unix timestamp (up to five years from now), the number of seconds until the reminder (if within 24 hours), or a natural language description (Ex. \"in 15 minutes,\" or \"every Thursday\")"),
  user: z.string().optional().describe("The user who will receive the reminder. If no user is specified, the reminder will go to user who created it."),
})

export const RemindersAddOutput = z.object({
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
}).describe("Schema for successful response from reminders.add method")

export const remindersAdd = pikkuSessionlessFunc({
  description: "Creates a reminder.",
  input: RemindersAddInput,
  output: RemindersAddOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/reminders.add", data) as any
  },
})
