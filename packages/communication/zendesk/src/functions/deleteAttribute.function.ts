import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteAttributeInput = z.object({
  attribute_id: z.string().describe("The ID of the skill-based routing attribute. Example: \"6e279587-e930-11e8-a292-09cfcdea1b75\""),
})

export const deleteAttribute = pikkuSessionlessFunc({
  description: "Deletes an attribute.\n\n#### Allowed For\n\n* Admins",
  input: DeleteAttributeInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/routing/attributes/{attribute_id}", data)
  },
})
