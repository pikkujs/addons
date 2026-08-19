import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CallsEndInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `calls:write`"),
  duration: z.number().int().optional().describe("Call duration in seconds"),
  id: z.string().describe("`id` returned when registering the call using the [`calls.add`](/methods/calls.add) method."),
})

export const CallsEndOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const callsEnd = pikkuSessionlessFunc({
  description: "Ends a Call.",
  input: CallsEndInput,
  output: CallsEndOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/calls.end", data) as any
  },
})
