import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteUserFieldOptionInput = z.object({
  user_field_id: z.union([z.number().int(), z.string()]).describe("The ID or key of the user field. Example: \"my_text_field\""),
  user_field_option_id: z.number().int().describe("The ID of the user field option. Example: 10001"),
})

export const deleteUserFieldOption = pikkuSessionlessFunc({
  description: "#### Allowed for\n* Admins",
  input: DeleteUserFieldOptionInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/user_fields/{user_field_id}/options/{user_field_option_id}", data)
  },
})
