import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdateItamAssetTypeFieldInput = z.object({
  asset_type_id: z.string().describe("The id of the asset type. Example: \"01K9AMAY0ST7VTVSG7SDAMR4P1\""),
  asset_type_field_id: z.string().describe("The id of the asset field. Example: \"01K9AMB3T2PBD108PF71ZDK7Y5\""),
})

export const UpdateItamAssetTypeFieldOutput = z.object({
  field: z.unknown().optional(),
})

export const updateItamAssetTypeField = pikkuSessionlessFunc({
  description: "Updates an existing asset field with the specified id.\n\n#### Allowed For\n\n* Admins",
  input: UpdateItamAssetTypeFieldInput,
  output: UpdateItamAssetTypeFieldOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PATCH", "/api/v2/it_asset_management/asset_types/{asset_type_id}/fields/{asset_type_field_id}", data) as any
  },
})
