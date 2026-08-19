import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteItamLocationInput = z.object({
  location_id: z.string().describe("The id of the location. Example: \"01KBFXPX2QFYZSSC1TMF3Q6T68\""),
})

export const deleteItamLocation = pikkuSessionlessFunc({
  description: "Deletes a location with the specified id.\n\n#### Allowed For\n\n* Admins",
  input: DeleteItamLocationInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/it_asset_management/locations/{location_id}", data)
  },
})
