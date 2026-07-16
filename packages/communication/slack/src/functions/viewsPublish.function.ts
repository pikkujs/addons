import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ViewsPublishInput = z.object({
  user_id: z.string().describe("`id` of the user you want publish a view to."),
  view: z.string().describe("A [view payload](/reference/surfaces/views). This must be a JSON-encoded string."),
  hash: z.string().optional().describe("A string that represents view state to protect against possible race conditions."),
  token: z.string().describe("Authentication token. Requires scope: `none`"),
})

export const ViewsPublishOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const viewsPublish = pikkuSessionlessFunc({
  description: "Publish a static view for a User.",
  input: ViewsPublishInput,
  output: ViewsPublishOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/views.publish", data) as any
  },
})
