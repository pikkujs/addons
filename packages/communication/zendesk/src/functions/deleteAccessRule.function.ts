import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteAccessRuleInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
  id: z.string().describe("The access rule ID. Example: \"6862342718335\""),
})

export const deleteAccessRule = pikkuSessionlessFunc({
  description: "Permanently deletes an access rule for a custom object.\n#### Allowed For\n* Admins",
  input: DeleteAccessRuleInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/custom_objects/{custom_object_key}/access_rules/{id}", data)
  },
})
