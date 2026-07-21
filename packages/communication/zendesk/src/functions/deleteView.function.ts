import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteViewInput = z.object({
  view_id: z.number().int().describe("The ID of the view. Example: 25"),
})

export const deleteView = pikkuSessionlessFunc({
  description: "#### Allowed For\n* Agents",
  input: DeleteViewInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/views/{view_id}", data)
  },
})
