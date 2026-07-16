import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateItamAssetTypeFieldInput = z.object({
  asset_type_id: z.string().describe("The id of the asset type. Example: \"01K9AMAY0ST7VTVSG7SDAMR4P1\""),
  field: z.unknown().optional(),
})

export const CreateItamAssetTypeFieldOutput = z.object({
  field: z.unknown().optional(),
})

export const createItamAssetTypeField = pikkuSessionlessFunc({
  description: "Creates an asset field for an individual asset type.\n\n#### Allowed For\n\n* Admins",
  input: CreateItamAssetTypeFieldInput,
  output: CreateItamAssetTypeFieldOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/it_asset_management/asset_types/{asset_type_id}/fields", data) as any
  },
})
