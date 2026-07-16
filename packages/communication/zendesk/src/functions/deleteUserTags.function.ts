import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteUserTagsInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
})

export const DeleteUserTagsOutput = z.object({
  tags: z.array(z.string()).describe("An array of strings"),
})

export const deleteUserTags = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents",
  input: DeleteUserTagsInput,
  output: DeleteUserTagsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/users/{user_id}/tags", data) as any
  },
})
