import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteItamAssetInput = z.object({
  asset_id: z.string().describe("The id of the asset. Example: \"01K9AMAPSER316NHTJ2R36YAQ1\""),
})

export const deleteItamAsset = pikkuSessionlessFunc({
  description: "Deletes an asset with the specified id.\n\n#### Allowed For\n\n* Admins",
  input: DeleteItamAssetInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/it_asset_management/assets/{asset_id}", data)
  },
})
