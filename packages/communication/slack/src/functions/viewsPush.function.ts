import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ViewsPushInput = z.object({
  trigger_id: z.string().describe("Exchange a trigger to post to the user."),
  view: z.string().describe("A [view payload](/reference/surfaces/views). This must be a JSON-encoded string."),
  token: z.string().describe("Authentication token. Requires scope: `none`"),
})

export const ViewsPushOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const viewsPush = pikkuSessionlessFunc({
  description: "Push a view onto the stack of a root view.",
  input: ViewsPushInput,
  output: ViewsPushOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/views.push", data) as any
  },
})
