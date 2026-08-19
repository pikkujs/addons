import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteItamAssetTypeFieldInput = z.object({
  asset_type_id: z.string().describe("The id of the asset type. Example: \"01K9AMAY0ST7VTVSG7SDAMR4P1\""),
  asset_type_field_id: z.string().describe("The id of the asset field. Example: \"01K9AMB3T2PBD108PF71ZDK7Y5\""),
})

export const deleteItamAssetTypeField = pikkuSessionlessFunc({
  description: "Deletes an asset field with the specified id.\n\n#### Allowed For\n\n* Admins",
  input: DeleteItamAssetTypeFieldInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/it_asset_management/asset_types/{asset_type_id}/fields/{asset_type_field_id}", data)
  },
})
