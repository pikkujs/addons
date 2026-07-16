import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RemindersListInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `reminders:read`"),
})

export const RemindersListOutput = z.object({
  ok: z.literal(true),
  reminders: z.array(z.object({
    complete_ts: z.number().int().optional(),
    creator: z.string().regex(new RegExp("^[UW][A-Z0-9]{2,}$")),
    id: z.string().regex(new RegExp("^Rm[A-Z0-9]{8,}$")),
    recurring: z.boolean(),
    text: z.string(),
    time: z.number().int().optional(),
    user: z.string().regex(new RegExp("^[UW][A-Z0-9]{2,}$")),
  })),
}).describe("Schema for successful response from reminders.list method")

export const remindersList = pikkuSessionlessFunc({
  description: "Lists all reminders created by or for a given user.",
  input: RemindersListInput,
  output: RemindersListOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/reminders.list", data) as any
  },
})
