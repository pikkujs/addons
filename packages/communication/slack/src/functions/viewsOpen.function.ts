import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ViewsOpenInput = z.object({
  trigger_id: z.string().describe("Exchange a trigger to post to the user."),
  view: z.string().describe("A [view payload](/reference/surfaces/views). This must be a JSON-encoded string."),
  token: z.string().describe("Authentication token. Requires scope: `none`"),
})

export const ViewsOpenOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const viewsOpen = pikkuSessionlessFunc({
  description: "Open a view for a user.",
  input: ViewsOpenInput,
  output: ViewsOpenOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/views.open", data) as any
  },
})
