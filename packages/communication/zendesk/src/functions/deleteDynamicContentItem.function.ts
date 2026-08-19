import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteDynamicContentItemInput = z.object({
  dynamic_content_item_id: z.number().int().describe("The ID of the dynamic content item. Example: 47"),
})

export const deleteDynamicContentItem = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins, Agents",
  input: DeleteDynamicContentItemInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/dynamic_content/items/{dynamic_content_item_id}", data)
  },
})
