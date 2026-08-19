import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteUserFieldInput = z.object({
  user_field_id: z.union([z.number().int(), z.string()]).describe("The ID or key of the user field. Example: \"my_text_field\""),
})

export const deleteUserField = pikkuSessionlessFunc({
  description: "#### Allowed for\n\n* Admins",
  input: DeleteUserFieldInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/user_fields/{user_field_id}", data)
  },
})
