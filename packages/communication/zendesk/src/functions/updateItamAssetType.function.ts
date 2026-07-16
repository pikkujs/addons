import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdateItamAssetTypeInput = z.object({
  asset_type_id: z.string().describe("The id of the asset type. Example: \"01K9AMAY0ST7VTVSG7SDAMR4P1\""),
})

export const UpdateItamAssetTypeOutput = z.object({
  asset_type: z.object({
    created_at: z.string().datetime().optional().describe("The time the asset type was created"),
    created_by_user_id: z.number().int().optional().describe("The id of the user who created the asset type"),
    description: z.string().nullable().optional().describe("A description of the asset type"),
    external_id: z.string().nullable().optional().describe("An id you can use to link asset types to external data"),
    field_keys: z.array(z.string()).optional().describe("Custom field keys associated with the asset type"),
    hierarchy_depth: z.number().int().optional().describe("The depth within the hierarchy tree. Valid values: 1, 2, and 3"),
    id: z.string().optional().describe("Automatically assigned upon creation"),
    is_standard: z.boolean().optional().describe("Whether this asset type is a standard asset type. Standard asset types cannot be modified."),
    name: z.string().describe("A unique display name for the asset type"),
    parent_id: z.string().describe("The id of the parent asset type within the hierarchy tree"),
    updated_at: z.string().datetime().optional().describe("The time of the asset type's last update"),
    updated_by_user_id: z.number().int().optional().describe("The id of the user who last the asset type"),
    url: z.string().optional().describe("Direct link to the specific asset type"),
  }).optional(),
})

export const updateItamAssetType = pikkuSessionlessFunc({
  description: "Updates an existing asset type.\n\n#### Allowed For\n\n* Admins",
  input: UpdateItamAssetTypeInput,
  output: UpdateItamAssetTypeOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PATCH", "/api/v2/it_asset_management/asset_types/{asset_type_id}", data) as any
  },
})
