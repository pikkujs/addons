import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DndEndDndInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `dnd:write`"),
})

export const DndEndDndOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response from dnd.endDnd method")

export const dndEndDnd = pikkuSessionlessFunc({
  description: "Ends the current user's Do Not Disturb session immediately.",
  input: DndEndDndInput,
  output: DndEndDndOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/dnd.endDnd", data) as any
  },
})
