import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RemindersCompleteInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `reminders:write`"),
  reminder: z.string().optional().describe("The ID of the reminder to be marked as complete"),
})

export const RemindersCompleteOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response from reminders.complete method")

export const remindersComplete = pikkuSessionlessFunc({
  description: "Marks a reminder as complete.",
  input: RemindersCompleteInput,
  output: RemindersCompleteOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/reminders.complete", data) as any
  },
})
