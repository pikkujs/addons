import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteDynamicContentVariantInput = z.object({
  dynamic_content_item_id: z.number().int().describe("The ID of the dynamic content item. Example: 47"),
  dynamic_content_variant_id: z.number().int().describe("The ID of the variant. Example: 23"),
})

export const deleteDynamicContentVariant = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins, Agents",
  input: DeleteDynamicContentVariantInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/dynamic_content/items/{dynamic_content_item_id}/variants/{dynamic_content_variant_id}", data)
  },
})
