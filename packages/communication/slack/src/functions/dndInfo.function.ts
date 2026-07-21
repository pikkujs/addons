import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DndInfoInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `dnd:read`"),
  user: z.string().optional().describe("User to fetch status for (defaults to current user)"),
})

export const DndInfoOutput = z.object({
  dnd_enabled: z.boolean(),
  next_dnd_end_ts: z.number().int(),
  next_dnd_start_ts: z.number().int(),
  ok: z.literal(true),
  snooze_enabled: z.boolean().optional(),
  snooze_endtime: z.number().int().optional(),
  snooze_remaining: z.number().int().optional(),
}).describe("Schema for successful response from dnd.info method")

export const dndInfo = pikkuSessionlessFunc({
  description: "Retrieves a user's current Do Not Disturb status.",
  input: DndInfoInput,
  output: DndInfoOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/dnd.info", data) as any
  },
})
