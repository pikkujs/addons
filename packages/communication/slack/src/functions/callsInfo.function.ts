import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CallsInfoInput = z.object({
  id: z.string().describe("`id` of the Call returned by the [`calls.add`](/methods/calls.add) method."),
  token: z.string().describe("Authentication token. Requires scope: `calls:read`"),
})

export const CallsInfoOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const callsInfo = pikkuSessionlessFunc({
  description: "Returns information about a Call.",
  input: CallsInfoInput,
  output: CallsInfoOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/calls.info", data) as any
  },
})
