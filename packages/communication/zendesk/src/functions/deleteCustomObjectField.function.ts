import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteCustomObjectFieldInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
  custom_object_field_key_or_id: z.string().describe("The key or id of a custom object field. Example: \"make\""),
})

export const deleteCustomObjectField = pikkuSessionlessFunc({
  description: "Deletes a field with the specified key. Note: You can't delete standard fields.\n#### Allowed For\n* Admins",
  input: DeleteCustomObjectFieldInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/custom_objects/{custom_object_key}/fields/{custom_object_field_key_or_id}", data)
  },
})
