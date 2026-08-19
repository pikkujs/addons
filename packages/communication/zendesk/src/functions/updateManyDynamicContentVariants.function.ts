import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UpdateManyDynamicContentVariantsInput = z.object({
  dynamic_content_item_id: z.number().int().describe("The ID of the dynamic content item. Example: 47"),
})

export const UpdateManyDynamicContentVariantsOutput = z.object({
  variants: z.array(z.object({
    active: z.boolean().optional().describe("If the variant is active and usable"),
    content: z.string().describe("The content of the variant"),
    created_at: z.string().datetime().optional().describe("When the variant was created"),
    default: z.boolean().optional().describe("If the variant is the default for the item it belongs to"),
    id: z.number().int().optional().describe("Automatically assigned when the variant is created"),
    locale_id: z.number().int().describe("An active locale"),
    outdated: z.boolean().optional().describe("If the variant is outdated"),
    updated_at: z.string().datetime().optional().describe("When the variant was last updated"),
    url: z.string().optional().describe("The API url of the variant"),
  })).optional(),
})

export const updateManyDynamicContentVariants = pikkuSessionlessFunc({
  description: "Updates one or more variants. See [Update Variant](/api-reference/ticketing/ticket-management/dynamic_content_item_variants/#update-variant).\n\nYou must specify the variants by id in the body. To get the variant ids, see [List Variants](/api-reference/ticketing/ticket-management/dynamic_content_item_variants/#list-variants).\n\n#### Allowed For\n\n* Admins, Agents",
  input: UpdateManyDynamicContentVariantsInput,
  output: UpdateManyDynamicContentVariantsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/dynamic_content/items/{dynamic_content_item_id}/variants/update_many", data) as any
  },
})
