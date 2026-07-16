import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteCustomObjectInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
})

export const deleteCustomObject = pikkuSessionlessFunc({
  description: "Permanently deletes the custom object with the specified key\n#### Allowed For\n* Admins",
  input: DeleteCustomObjectInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/custom_objects/{custom_object_key}", data)
  },
})
