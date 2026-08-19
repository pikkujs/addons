import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CallsUpdateInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `calls:write`"),
  desktop_app_join_url: z.string().optional().describe("When supplied, available Slack clients will attempt to directly launch the 3rd-party Call with this URL."),
  id: z.string().describe("`id` returned by the [`calls.add`](/methods/calls.add) method."),
  join_url: z.string().optional().describe("The URL required for a client to join the Call."),
  title: z.string().optional().describe("The name of the Call."),
})

export const CallsUpdateOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const callsUpdate = pikkuSessionlessFunc({
  description: "Updates information about a Call.",
  input: CallsUpdateInput,
  output: CallsUpdateOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/calls.update", data) as any
  },
})
