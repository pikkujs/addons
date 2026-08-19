import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowItamAssetTypeFieldInput = z.object({
  asset_type_id: z.string().describe("The id of the asset type. Example: \"01K9AMAY0ST7VTVSG7SDAMR4P1\""),
  asset_type_field_id: z.string().describe("The id of the asset field. Example: \"01K9AMB3T2PBD108PF71ZDK7Y5\""),
})

export const ShowItamAssetTypeFieldOutput = z.object({
  field: z.unknown().optional(),
})

export const showItamAssetTypeField = pikkuSessionlessFunc({
  description: "Returns an asset field with the specified id.\n\n#### Allowed For\n\n* Agents",
  input: ShowItamAssetTypeFieldInput,
  output: ShowItamAssetTypeFieldOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/it_asset_management/asset_types/{asset_type_id}/fields/{asset_type_field_id}", data) as any
  },
})
