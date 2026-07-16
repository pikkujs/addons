import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateManyDynamicContentVariantsInput = z.object({
  dynamic_content_item_id: z.number().int().describe("The ID of the dynamic content item. Example: 47"),
})

export const CreateManyDynamicContentVariantsOutput = z.object({
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

export const createManyDynamicContentVariants = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins, Agents",
  input: CreateManyDynamicContentVariantsInput,
  output: CreateManyDynamicContentVariantsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/dynamic_content/items/{dynamic_content_item_id}/variants/create_many", data) as any
  },
})
