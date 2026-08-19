import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteBrandLogoInput = z.object({
  brand_id: z.number().int().describe("The ID of the brand. Example: 360002783572"),
})

export const deleteBrandLogo = pikkuSessionlessFunc({
  description: "Removes the logo from a brand. Returns 204 even if the brand had no logo.\n\n#### Allowed for\n* Admins",
  input: DeleteBrandLogoInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/brands/{brand_id}/logo", data)
  },
})
