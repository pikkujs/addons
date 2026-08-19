import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListItamAssetTypeFieldsInput = z.object({
  asset_type_id: z.string().describe("The id of the asset type. Example: \"01K9AMAY0ST7VTVSG7SDAMR4P1\""),
})

export const ListItamAssetTypeFieldsOutput = z.object({
  fields: z.array(z.unknown()).optional(),
})

export const listItamAssetTypeFields = pikkuSessionlessFunc({
  description: "Lists all standard and custom fields for an asset type.\n\n#### Allowed For\n\n* Agents",
  input: ListItamAssetTypeFieldsInput,
  output: ListItamAssetTypeFieldsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/it_asset_management/asset_types/{asset_type_id}/fields", data) as any
  },
})
