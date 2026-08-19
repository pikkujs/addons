import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UpdateDynamicContentItemInput = z.object({
  dynamic_content_item_id: z.number().int().describe("The ID of the dynamic content item. Example: 47"),
})

export const UpdateDynamicContentItemOutput = z.object({
  item: z.object({
    created_at: z.string().datetime().optional().describe("When this record was created"),
    default_locale_id: z.number().int().describe("The default locale for the item. Must be one of the [locales the account has active](/api-reference/ticketing/account-configuration/locales/#list-locales)."),
    id: z.number().int().optional().describe("Automatically assigned when creating items"),
    name: z.string().describe("The unique name of the item"),
    outdated: z.boolean().optional().describe("Indicates the item has outdated variants within it"),
    placeholder: z.string().optional().describe("Automatically generated placeholder for the item, derived from name"),
    updated_at: z.string().datetime().optional().describe("When this record was last updated"),
    url: z.string().optional().describe("The API url of this item"),
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
    })).describe("All variants within this item. See [Dynamic Content Item Variants](/api-reference/ticketing/ticket-management/dynamic_content_item_variants/)"),
  }).optional(),
})

export const updateDynamicContentItem = pikkuSessionlessFunc({
  description: "The only attribute you can change is the name.\n\nTo add a variant to the item, or to update or delete the variants of the item, use the [Item Variants API](/api-reference/ticketing/ticket-management/dynamic_content_item_variants/#update-many-variants).\n\n#### Allowed For\n\n* Admins, Agents",
  input: UpdateDynamicContentItemInput,
  output: UpdateDynamicContentItemOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/dynamic_content/items/{dynamic_content_item_id}", data) as any
  },
})
