import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdateDynamicContentVariantInput = z.object({
  dynamic_content_item_id: z.number().int().describe("The ID of the dynamic content item. Example: 47"),
  dynamic_content_variant_id: z.number().int().describe("The ID of the variant. Example: 23"),
})

export const UpdateDynamicContentVariantOutput = z.object({
  variant: z.object({
    active: z.boolean().optional().describe("If the variant is active and usable"),
    content: z.string().describe("The content of the variant"),
    created_at: z.string().datetime().optional().describe("When the variant was created"),
    default: z.boolean().optional().describe("If the variant is the default for the item it belongs to"),
    id: z.number().int().optional().describe("Automatically assigned when the variant is created"),
    locale_id: z.number().int().describe("An active locale"),
    outdated: z.boolean().optional().describe("If the variant is outdated"),
    updated_at: z.string().datetime().optional().describe("When the variant was last updated"),
    url: z.string().optional().describe("The API url of the variant"),
  }).optional(),
})

export const updateDynamicContentVariant = pikkuSessionlessFunc({
  description: "Updates the specified variant. You don't need to include all the properties. If you just want to update content, for example, then include just that.\n\nYou can't switch the active state of the default variant of an item. Similarly, you can't switch the default to false if the variant is the default. You must make another variant default instead.\n\n#### Allowed For\n\n* Admins, Agents",
  input: UpdateDynamicContentVariantInput,
  output: UpdateDynamicContentVariantOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/dynamic_content/items/{dynamic_content_item_id}/variants/{dynamic_content_variant_id}", data) as any
  },
})
