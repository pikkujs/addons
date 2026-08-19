import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DndEndSnoozeInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `dnd:write`"),
})

export const DndEndSnoozeOutput = z.object({
  dnd_enabled: z.boolean(),
  next_dnd_end_ts: z.number().int(),
  next_dnd_start_ts: z.number().int(),
  ok: z.literal(true),
  snooze_enabled: z.boolean(),
}).describe("Schema for successful response from dnd.endSnooze method")

export const dndEndSnooze = pikkuSessionlessFunc({
  description: "Ends the current user's snooze mode immediately.",
  input: DndEndSnoozeInput,
  output: DndEndSnoozeOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/dnd.endSnooze", data) as any
  },
})
