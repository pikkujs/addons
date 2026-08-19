import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteGroupInput = z.object({
  group_id: z.number().int().describe("The ID of the group. Example: 122"),
})

export const deleteGroup = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins\n* Agents assigned to a custom role with permissions to manage groups (Enterprise only)",
  input: DeleteGroupInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/groups/{group_id}", data)
  },
})
