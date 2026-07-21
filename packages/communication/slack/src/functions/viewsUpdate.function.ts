import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ViewsUpdateInput = z.object({
  view_id: z.string().optional().describe("A unique identifier of the view to be updated. Either `view_id` or `external_id` is required."),
  external_id: z.string().optional().describe("A unique identifier of the view set by the developer. Must be unique for all views on a team. Max length of 255 characters. Either `view_id` or `external_id` is required."),
  view: z.string().optional().describe("A [view object](/reference/surfaces/views). This must be a JSON-encoded string."),
  hash: z.string().optional().describe("A string that represents view state to protect against possible race conditions."),
  token: z.string().describe("Authentication token. Requires scope: `none`"),
})

export const ViewsUpdateOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const viewsUpdate = pikkuSessionlessFunc({
  description: "Update an existing view.",
  input: ViewsUpdateInput,
  output: ViewsUpdateOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/views.update", data) as any
  },
})
