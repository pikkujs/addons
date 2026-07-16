import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RemindersDeleteInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `reminders:write`"),
  reminder: z.string().optional().describe("The ID of the reminder"),
})

export const RemindersDeleteOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response from reminders.delete method")

export const remindersDelete = pikkuSessionlessFunc({
  description: "Deletes a reminder.",
  input: RemindersDeleteInput,
  output: RemindersDeleteOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/reminders.delete", data) as any
  },
})
