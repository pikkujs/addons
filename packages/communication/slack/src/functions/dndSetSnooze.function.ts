import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DndSetSnoozeInput = z.object({
  num_minutes: z.string().describe("Number of minutes, from now, to snooze until."),
  token: z.string().describe("Authentication token. Requires scope: `dnd:write`"),
})

export const DndSetSnoozeOutput = z.object({
  ok: z.literal(true),
  snooze_enabled: z.boolean(),
  snooze_endtime: z.number().int(),
  snooze_remaining: z.number().int(),
}).describe("Schema for successful response from dnd.setSnooze method")

export const dndSetSnooze = pikkuSessionlessFunc({
  description: "Turns on Do Not Disturb mode for the current user, or changes its duration.",
  input: DndSetSnoozeInput,
  output: DndSetSnoozeOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/dnd.setSnooze", data) as any
  },
})
