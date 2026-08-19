import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteItamAssetTypeInput = z.object({
  asset_type_id: z.string().describe("The id of the asset type. Example: \"01K9AMAY0ST7VTVSG7SDAMR4P1\""),
})

export const deleteItamAssetType = pikkuSessionlessFunc({
  description: "Deletes an asset type with the specified id.\n\n#### Allowed For\n\n* Admins",
  input: DeleteItamAssetTypeInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/it_asset_management/asset_types/{asset_type_id}", data)
  },
})
