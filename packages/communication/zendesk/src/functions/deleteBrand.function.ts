import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteBrandInput = z.object({
  brand_id: z.number().int().describe("The ID of the brand. Example: 360002783572"),
})

export const deleteBrand = pikkuSessionlessFunc({
  description: "Deletes a brand.\n\n#### Allowed for\n- Admins",
  input: DeleteBrandInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/brands/{brand_id}", data)
  },
})
