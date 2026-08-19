import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteAttributeValueInput = z.object({
  attribute_id: z.string().describe("The ID of the skill-based routing attribute. Example: \"6e279587-e930-11e8-a292-09cfcdea1b75\""),
  attribute_value_id: z.string().describe("The ID of the skill-based routing attribute value. Example: \"b376b35a-e38b-11e8-a292-e3b6377c5575\""),
})

export const deleteAttributeValue = pikkuSessionlessFunc({
  description: "Deletes an attribute value.\n\n#### Allowed For\n\n* Agents",
  input: DeleteAttributeValueInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/routing/attributes/{attribute_id}/values/{attribute_value_id}", data)
  },
})
