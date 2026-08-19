import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowDynamicContentVariantInput = z.object({
  dynamic_content_item_id: z.number().int().describe("The ID of the dynamic content item. Example: 47"),
  dynamic_content_variant_id: z.number().int().describe("The ID of the variant. Example: 23"),
})

export const ShowDynamicContentVariantOutput = z.object({
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

export const showDynamicContentVariant = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins, Agents",
  input: ShowDynamicContentVariantInput,
  output: ShowDynamicContentVariantOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/dynamic_content/items/{dynamic_content_item_id}/variants/{dynamic_content_variant_id}", data) as any
  },
})
